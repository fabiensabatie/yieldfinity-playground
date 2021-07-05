import { Candle, ExchangePair } from "yieldfinity";
import { Exchange } from "../../entities/exchange";

export interface CandleRepositoryInterface {
  get(exchange: Exchange, startDate: Date, endDate: Date, pair: ExchangePair): Promise<Candle[]>;
}