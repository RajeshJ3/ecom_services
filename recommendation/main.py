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
async def products(tag: str):
    return Product.find(Product.tags << tag).all()
