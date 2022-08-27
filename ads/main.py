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
async def ads(pk: str):
    # Some random ads logic here..
    tags_list = [Product.get(pk).tags for pk in Product.all_pks()]

    tags = []
    for i in tags_list: tags += i
    
    final_tags = []
    for i in list(set(tags)):
        if i not in Product.get(pk).tags: final_tags.append(i)
    
    return Product.find(Product.tags << final_tags).first()
