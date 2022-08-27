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


@app.post("/{pk}", response_model=Order)
async def checkout(pk: str, status: str, token: str):
    try:
        order: Order = Order.find(
            (Order.token == token) &
            (Order.pk == pk)
        ).first()

        order.status = status
        order.save()

        # when order is completed
        if status == "completed":
            channel = "payment"
            data = {"order": order.dict()}
            pubsub.publish(data, channel)

        return order

    except NotFoundError:
        return responses.Response(status_code=404)
    except:
        return responses.Response(status_code=500)
