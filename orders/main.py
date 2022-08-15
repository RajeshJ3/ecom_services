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
async def order(pk: str, token: str):
    try:
        return Order.find(
            (Order.token == token) &
            (Order.pk == pk)
        ).first()
    except NotFoundError:
        return responses.Response(status_code=404)
    except:
        return responses.Response(status_code=500)


@app.post("/")
async def orders(order: Order):
    return order.save()


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
