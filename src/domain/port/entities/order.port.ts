import { ExchangePair } from "../../port/entities/exchange.port";

export type OrderSide = "ask" | "bid";

export interface OrderState {
  openAt: Date;
  closeAt: Date;
  fee: number;
  profit: number;
}

export interface OrderProps {
  side: OrderSide;
  pair: ExchangePair;
  quantity: number;
  price: number;
  state: OrderState;
}