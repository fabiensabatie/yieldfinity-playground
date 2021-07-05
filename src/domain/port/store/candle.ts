import { Candle, ExchangePair } from "yieldfinity";
import { CandleRepository } from "../../../adapters/repositories/candle";

export interface CandleStoreInterface {
  candles: Candle[];
  loading: boolean;
  set: (startDate: Date, endDate: Date, pair: ExchangePair) => Promise<void>;
}