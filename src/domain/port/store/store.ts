import { UseStore } from "zustand";
import {  CandleStoreInterface } from "./candle";
import { PositionStoreInterface } from "./position";
import { StrategyStoreInterface } from "./strategy";
export interface StoreInterface {
  candles: UseStore<CandleStoreInterface>;
  positions: UseStore<PositionStoreInterface>;
  strategies: UseStore<StrategyStoreInterface>;
}