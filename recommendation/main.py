# fastapi
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.products.models import Product

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_headers=["*"],
    allow_methods=["*"],
    allow_credentials=True
)

@app.get("/")
async def products(pk: str):
    product = Product.get(pk)
    return Product.find(Product.tags << product.tags).all()
