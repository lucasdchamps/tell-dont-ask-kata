import Product from './Product';

class OrderItem {
  private product: Product;
  private quantity: number;
  private taxedAmount: number;
  private tax: number;

  public constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
    const unitaryTax: number = Math.round(product.getPrice() / 100 * product.getCategory().getTaxPercentage() * 100) / 100;
    const unitaryTaxedAmount: number = Math.round((product.getPrice() + unitaryTax) * 100) / 100;
    this.taxedAmount = Math.round(unitaryTaxedAmount * quantity * 100) / 100;
    this.tax = unitaryTax * quantity;
  }

  public getProduct(): Product {
    return this.product;
  }

  public setProduct(product: Product): void {
    this.product = product;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public setQuantity(quantity: number): void {
    this.quantity = quantity;
  }

  public getTaxedAmount(): number {
    return this.taxedAmount;
  }

  public setTaxedAmount(taxedAmount: number): void {
    this.taxedAmount = taxedAmount;
  }

  public getTax(): number {
    return this.tax;
  }

  public setTax(tax: number): void {
    this.tax = tax;
  }
}

export default OrderItem;

