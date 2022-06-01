import Product from './Product';

class OrderItem {
  private product: Product;
  private quantity: number;

  public constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }

  public getProduct(): Product {
    return this.product;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getTaxedAmount(): number {
    const unitaryTaxedAmount: number = Math.round((this.product.getPrice() + this.computeUnitaryTax()) * 100) / 100;
    return Math.round(unitaryTaxedAmount * this.quantity * 100) / 100;
  }

  private computeUnitaryTax() {
    return Math.round(this.product.getPrice() / 100 * this.product.getCategory().getTaxPercentage() * 100) / 100;
  }

  public getTax(): number {
    return this.computeUnitaryTax() * this.quantity;
  }
}

export default OrderItem;

