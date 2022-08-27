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


@app.get("/products/{pk}")
async def one_product(pk: str):
    '''
    get a single product
    '''
    resp = requests.get(
        url=f"{get_domain(services.INVENTORY)}/{pk}"
    )
    return Response(resp)


@app.get("/similar-products")
async def similar_products(pk: str):
    '''
    get similar products
    '''
    resp = requests.get(
        url=f"{get_domain(services.RECOMMENDATION)}",
        params={"pk": pk}
    )
    return Response(resp)


@app.get("/ad")
async def ads(pk: str):
    '''
    get an ad
    '''
    resp = requests.get(
        url=f"{get_domain(services.ADS)}",
        params={"pk": pk}
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


@app.get("/order")
async def order(pk: str, token: str):
    '''
    fetch an order related 
    '''
    resp = requests.get(
        url=f"{get_domain(services.ORDERS)}/{pk}",
        params={
            "token": token,
        }
    )
    return Response(resp)


@app.get("/current-order")
async def current_order(token: str):
    '''
    fetch all orders related to a particular order 
    '''

    resp = requests.get(
        url=f"{get_domain(services.ORDERS)}/current-order",
        params={"token": token}
    )

    if not resp.status_code == 200:
        return {}

    data = resp.json()

    order_items = data["order_items"]
    updated_order_items = []
    for order_item in order_items:
        updated_order_items.append(requests.get(
            url=f"{get_domain(services.INVENTORY)}/{order_item}").json())

    data["order_items"] = updated_order_items

    return data


@app.post("/add-to-cart")
async def add_to_cart(pk: str, token: str):
    '''
    add item to cart
    '''
    resp = requests.post(
        url=f"{get_domain(services.ORDERS)}/add-to-cart",
        params={
            "pk": pk,
            "token": token
        }
    )
    return Response(resp)


@app.post("/remove-from-cart")
async def remove_from_cart(pk: str, token: str):
    '''
    remove item from cart
    '''
    resp = requests.post(
        url=f"{get_domain(services.ORDERS)}/remove-from-cart",
        params={
            "pk": pk,
            "token": token
        }
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
async def checkout(pk: str, status: str, token: str):
    '''
    checkout an order
    '''
    resp = requests.post(
        url=f"{get_domain(services.CHECKOUT)}/{pk}",
        params={"token": token, "status": status}
    )
    return Response(resp)
