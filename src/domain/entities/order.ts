import { ExchangePair } from "../port/entities/exchange.port";
import { OrderProps, OrderSide, OrderState } from "../port/entities/order.port";


export class Order {
  constructor(private props: OrderProps) { }

  get side(): OrderSide { return this.props.side }
  get pair(): ExchangePair { return this.props.pair }
  get quantity(): number { return this.props.quantity }
  get price(): number { return this.props.price }
  get state(): OrderState { return this.props.state }
}