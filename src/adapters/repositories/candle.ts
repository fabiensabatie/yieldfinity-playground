import { Exchange } from "../../domain/entities/exchange";
import { CandleRepositoryInterface } from "../../domain/port/repositories/candle";
import { BaseRepository } from "./base-repository";
import { Binance, Candle, ExchangePair } from "yieldfinity";

export class CandleRepository extends BaseRepository implements CandleRepositoryInterface {
  public async get(exchange: Exchange, startDate: Date, endDate: Date, pair: ExchangePair):Promise<Candle[]> {
    return await new Binance().getCandles(startDate, endDate, pair, "1m");
  }
}