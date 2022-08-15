from core.products.models import run_products_migrator
from core.orders.models import run_orders_migrator

print("[START] Migration")
run_orders_migrator()
run_products_migrator()
print("[DONE] Migration")
