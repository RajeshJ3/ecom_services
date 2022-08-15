from core import pubsub
from core.orders.models import Order
from core.products.models import Product

def handle_order(data: Order, *args, **kwargs):
    print("New Order Received")
    order = data["order"]
    order_items = order["order_items"]
    for order_item in order_items:
        product:Product = Product.get(order_item["product"])
        product.downloads = product.downloads + 1
        product.save()
        print(f"#{product.pk} download count incremented to {product.downloads}")
    
    print(f"Order #{order['pk']} Completed")

pubsub.subscribe("order_completed", handle_order)
