import { Order } from "../../domain/entities/order";
import { OrderProps } from "../../domain/port/entities/order.port";
import { Position } from "../../domain/port/entities/position.port";

const PositionMapper = {
  toDomain(order: OrderProps) : Position {
    return new Order({
      side: order.side, 
      pair: order.pair, 
      quantity: order.quantity, 
      price: order.price, 
      state:  {
        ...order.state,
        openAt: new Date(order.state.openAt),
        closeAt: new Date(order.state.closeAt)
      }
    });
  }
}

export default  PositionMapper;