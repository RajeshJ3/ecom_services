from core import pubsub
from core.orders.models import Order

def handle_email(data: Order, *args, **kwargs):
    order = data["order"]
    order = Order.get(order['pk'])

    # Some logic to send email to the customer at email "{order.customer.email}"

    print(f"Email sent to {order.customer.email} for Order #{order.pk}")

pubsub.subscribe("email", handle_email)
