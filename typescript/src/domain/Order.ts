import OrderItem from './OrderItem';
import { OrderStatus } from './OrderStatus';
import ApprovedOrderCannotBeRejectedException from '../useCase/ApprovedOrderCannotBeRejectedException';
import RejectedOrderCannotBeApprovedException from '../useCase/RejectedOrderCannotBeApprovedException';
import ShippedOrdersCannotBeChangedException from '../useCase/ShippedOrdersCannotBeChangedException';
import Product from './Product';

class Order {
  private total: number;
  private currency: string;
  private items: OrderItem[];
  private tax: number;
  private status: OrderStatus;
  private id: number;

  public constructor() {
    this.setStatus(OrderStatus.CREATED);
    this.setItems([]);
    this.setCurrency('EUR');
    this.setTotal(0);
    this.setTax(0);
  }

  public approve(isApproved: boolean): void {
    if (this.status === OrderStatus.SHIPPED) {
      throw new ShippedOrdersCannotBeChangedException();
    }

    if (isApproved && this.status === OrderStatus.REJECTED) {
      throw new RejectedOrderCannotBeApprovedException();
    }

    if (!isApproved && this.status === OrderStatus.APPROVED) {
      throw new ApprovedOrderCannotBeRejectedException();
    }

    this.setStatus(isApproved ? OrderStatus.APPROVED : OrderStatus.REJECTED);
  }

  public addProduct(product: Product, quantity: number) {
    const orderItem: OrderItem = new OrderItem(product, quantity);
    this.addOrderItem(orderItem);
  }

  private addOrderItem(orderItem: OrderItem) {
    this.items.push(orderItem);

    this.setTotal(this.total + orderItem.getTaxedAmount());
    this.setTax(this.tax + orderItem.getTax());
  }

  public getTotal(): number {
    return this.total;
  }

  public setTotal(total: number): void  {
    this.total = total;
  }

  public getCurrency(): string {
    return this.currency;
  }

  public setCurrency(currency: string): void {
    this.currency = currency;
  }

  public getItems(): OrderItem[] {
    return this.items;
  }

  public setItems(items: OrderItem[]): void {
    this.items = items;
  }

  public getTax(): number {
    return this.tax;
  }

  public setTax(tax: number): void {
    this.tax = tax;
  }

  public getStatus(): OrderStatus {
    return this.status;
  }

  public setStatus(status: OrderStatus): void {
    this.status = status;
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }
}

export default Order;

