# fastapi
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# python's
import requests

# custom modules
from helpers import get_domain, Response
from core.orders.models import Order
import services

# FastAPI instance
app = FastAPI()

# adding CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_headers=["*"],
    allow_methods=["*"],
    allow_credentials=True
)


@app.get("/products")
async def all_products():
    '''
    fetch all products in catalog
    '''
    resp = requests.get(
        url=f"{get_domain(services.INVENTORY)}"
    )
    return Response(resp)


@app.get("/similar-products")
async def similar_products(tag: str):
    '''
    get similar products
    '''
    resp = requests.get(
        url=f"{get_domain(services.RECOMMENDATION)}",
        params={"tag": tag}
    )
    return Response(resp)


@app.get("/orders")
async def all_orders(token: str):
    '''
    fetch all orders related to a particular order 
    '''
    resp = requests.get(
        url=f"{get_domain(services.ORDERS)}",
        params={"token": token}
    )
    return Response(resp)


@app.post("/orders")
async def orders(order: Order):
    '''
    create a new order
    '''
    resp = requests.post(
        url=f"{get_domain(services.ORDERS)}",
        json=order.dict()
    )
    return Response(resp)


@app.get("/order/{pk}")
async def one_orders(pk: str, token: str):
    '''
    get a single order
    '''
    resp = requests.get(
        url=f"{get_domain(services.ORDERS)}/{pk}",
        params={"token": token}
    )
    return Response(resp)


@app.patch("/orders/{pk}", response_model=Order)
async def update_order(pk: str, data: dict, token: str):
    '''
    update order
    '''
    resp = requests.patch(
        url=f"{get_domain(services.ORDERS)}/orders/{pk}",
        params={"token": token},
        json=data
    )
    return Response(resp)


@app.post("/orders/{pk}", response_model=Order)
async def update_order_status(pk: str, status: str, token: str):
    '''
    update order status
    '''
    resp = requests.post(
        url=f"{get_domain(services.ORDERS)}/orders/{pk}",
        params={"token": token, "status": status}
    )
    return Response(resp)
