import { UseStore } from "zustand";
import {  CandleStoreInterface } from "./candle";

export interface StoreInterface {
  candles: UseStore<CandleStoreInterface>;
}