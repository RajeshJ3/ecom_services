# fastapi
from fastapi import FastAPI

from redis_om import NotFoundError

from core.products.models import Product

app = FastAPI()


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
