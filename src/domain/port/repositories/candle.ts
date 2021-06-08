import { Candle } from "../../entities/candle";
import { Exchange } from "../../entities/exchange";
import { ExchangeInterval, ExchangePair } from "../entities/exchange.port";

export interface CandleRepositoryInterface {
  get(exchange: Exchange, startDate: Date, endDate: Date, pair: ExchangePair): Promise<Candle[]>;
}