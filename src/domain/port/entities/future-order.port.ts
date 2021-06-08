import { ExchangePair } from "./exchange.port";

export interface MarketOrder { type: "market" }
export interface LimitOrder { type: "market"; price: number; }
export interface StopMarketOrder { type: "stopMarket"; stopPrice: number; }
export interface StopLimitOrder { type: "stopMarket"; stopPrice: number; price: number };

export type FutureOrderType = MarketOrder | LimitOrder | StopMarketOrder | StopLimitOrder;
export type FutureOrderSide = "long" | "short";

export interface FutureOrderState {
  openedAt: Date;
  closedAt: Date;
  fee: number;
  profit: number;
  leverage: number;
}

export interface FutureOrderProps {
  pair: ExchangePair;
  side: FutureOrderSide;
  size: number;
  order: FutureOrderType;
  state: FutureOrderState;
};