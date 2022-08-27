from core import pubsub
from core.orders.models import Order

def handle_invoice(data: Order, *args, **kwargs):
    print("Generating invoice for Order #", end="")
    order = data["order"]
    print(order['pk'])
    order = Order.get(order['pk'])
    order.update(
        invoice_url="https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf"
    )
    order.save()
    print(f"Generated invoice for Order #{order.pk}")

    # trigger email service
    channel = "email"
    pubsub.publish(data, channel)

pubsub.subscribe("invoice", handle_invoice)
