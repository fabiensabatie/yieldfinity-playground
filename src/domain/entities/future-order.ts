import { ExchangePair } from "../port/entities/exchange.port";
import { FutureOrderProps, FutureOrderSide, FutureOrderState, FutureOrderType } from "../port/entities/future-order.port";

export class FutureOrder {
  constructor(private props: FutureOrderProps) { }

  get pair() : ExchangePair { return this.props.pair }
  get side() : FutureOrderSide { return this.props.side }
  get size() : number { return this.props.size }
  get order() : FutureOrderType { return this.props.order }
  get state() : FutureOrderState { return this.props.state }
}