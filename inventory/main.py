# fastapi
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from redis_om import NotFoundError

from core.products.models import Product

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_headers=["*"],
    allow_methods=["*"],
    allow_credentials=True
)


@app.get("/products")
async def all_products():
    all_pks = Product.all_pks()
    return [Product.get(pk) for pk in all_pks]


@app.post("/products")
async def products(product: Product):
    product.save()
    return product

@app.get("/")
async def one(pk: str):
    try: return Product.get(pk)
    except NotFoundError: return {"details": "Not Found"}
    except: return {}
