# fastapi
from fastapi import FastAPI, responses
from fastapi.middleware.cors import CORSMiddleware

from redis_om import NotFoundError

from core.orders.models import Order
from core import pubsub

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_headers=["*"],
    allow_methods=["*"],
    allow_credentials=True
)


@app.get("/")
async def all_orders(token: str):
    return Order.find(Order.token == token).all()


@app.get("/{pk}")
async def orders(pk: str, token: str):
    return Order.find(
        (Order.token == token) &
        (Order.pk == pk)
    ).first()


@app.get("/current-order")
async def current_order(token: str):
    try:
        return Order.find(
            (Order.token == token) &
            (Order.status == "init")
        ).first()
    except NotFoundError:
        return responses.Response("{}", status_code=404)
    except:
        return responses.Response("{}", status_code=500)


@app.post("/add-to-cart")
async def add_to_cart(pk: str, token: str):
    orders = Order.find(
        (Order.token == token) &
        (Order.status == "init")
    ).all()

    order = None

    if orders:
        order = orders[0]
    else:
        order = Order(
            token=token,
            order_items=[pk]
        )
        order.save()

    if pk not in order.order_items:
        order.order_items = [*order.order_items, pk]
        order.save()

    return order


@app.post("/remove-from-cart")
async def remove_from_cart(pk: str, token: str):
    order = Order.find(
        (Order.token == token) &
        (Order.status == "init")
    ).first()

    if pk in order.order_items:
        order_items = [*order.order_items]
        index = order_items.index(pk)
        print(index)
        order_items.pop(index)
        order.order_items = order_items
        order.save()

    return order


@app.patch("/orders/{pk}", response_model=Order)
async def update_order(pk: str, data: dict, token: str):
    try:
        order: Order = Order.find(
            (Order.token == token) &
            (Order.pk == pk)
        ).first()

        previous_status = order.status

        updated_data = {**order.dict(), **data}
        print(updated_data)

        order.update(**updated_data)

        order.status = previous_status

        return order.save()
    except NotFoundError:
        return responses.Response("{}", status_code=404)
    except:
        return responses.Response("{}", status_code=500)


@app.post("/orders/{pk}", response_model=Order)
async def update_order_status(pk: str, status: str, token: str):
    try:
        order: Order = Order.find(
            (Order.token == token) &
            (Order.pk == pk)
        ).first()

        order.status = status
        order.save()

        # when order is completed
        if status == "completed":
            channel = "order_completed"
            data = {"order": order.dict()}
            pubsub.publish(data, channel)

        return order

    except NotFoundError:
        return responses.Response(status_code=404)
    except:
        return responses.Response(status_code=500)
