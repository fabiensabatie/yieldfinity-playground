import { CandleRepository } from "../../../adapters/repositories/candle";
import { Candle } from "../../entities/candle";
import { Exchange } from "../../entities/exchange";
import { ExchangeInterval, ExchangePair } from "../entities/exchange.port";

export interface CandleStoreInterface {
  candles: Candle[];
  loading: boolean;
  set: (startDate: Date, endDate: Date, pair: ExchangePair) => Promise<void>;
}