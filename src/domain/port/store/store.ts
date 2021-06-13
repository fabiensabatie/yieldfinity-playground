import { UseStore } from "zustand";
import {  CandleStoreInterface } from "./candle";
import { PositionStoreInterface } from "./position";
export interface StoreInterface {
  candles: UseStore<CandleStoreInterface>;
  positions: UseStore<PositionStoreInterface>;
}