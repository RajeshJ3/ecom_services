# fastapi
from fastapi import FastAPI

from redis_om import NotFoundError

from core.products.models import Product

import json

app = FastAPI()

def get_or_create_productcatalog():
    if [*Product.all_pks()].__len__():
        print("Already have product catalog")
        return

    print("Creating product catalog")

    with open("resources/products.json", "r") as fp:
        DATA = json.load(fp)

    for index, data in enumerate(DATA):
        product = Product(**data)
        product.save()
        print(f"CREATED #{index + 1}")


@app.on_event("startup")
async def startup_event():
    get_or_create_productcatalog()

@app.get("/")
async def all_products():
    all_pks = Product.all_pks()
    return [Product.get(pk) for pk in all_pks]


@app.post("/")
async def products(product: Product):
    return product.save()


@app.get("/{pk}")
async def product(pk: str):
    try:
        return Product.get(pk)
    except NotFoundError:
        return {"details": "Not Found"}
    except:
        return {}
