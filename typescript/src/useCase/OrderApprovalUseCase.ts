import Order from '../domain/Order';
import { OrderStatus } from '../domain/OrderStatus';
import OrderRepository from '../repository/OrderRepository';
import ApprovedOrderCannotBeRejectedException from './ApprovedOrderCannotBeRejectedException';
import OrderApprovalRequest from './OrderApprovalRequest';
import RejectedOrderCannotBeApprovedException from './RejectedOrderCannotBeApprovedException';
import ShippedOrdersCannotBeChangedException from './ShippedOrdersCannotBeChangedException';

class OrderApprovalUseCase {
  private readonly orderRepository: OrderRepository;

  public constructor(orderRepository: OrderRepository){
    this.orderRepository = orderRepository;
  }

  public run(request: OrderApprovalRequest): void {
    const order: Order = this.orderRepository.getById(request.getOrderId());

    this.approve(order, request.isApproved());
    this.orderRepository.save(order);
  }

  private approve(order: Order, isApproved: boolean) {
    if (order.getStatus() === OrderStatus.SHIPPED) {
      throw new ShippedOrdersCannotBeChangedException();
    }

    if (isApproved && order.getStatus() === OrderStatus.REJECTED) {
      throw new RejectedOrderCannotBeApprovedException();
    }

    if (!isApproved && order.getStatus() === OrderStatus.APPROVED) {
      throw new ApprovedOrderCannotBeRejectedException();
    }

    order.setStatus(isApproved ? OrderStatus.APPROVED : OrderStatus.REJECTED);
  }
}

export default OrderApprovalUseCase;
