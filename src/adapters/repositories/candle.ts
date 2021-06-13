import { Exchange } from "../../domain/entities/exchange";
import { ExchangePair } from "../../domain/port/entities/exchange.port";
import { CandleRepositoryInterface } from "../../domain/port/repositories/candle";
import { BaseRepository } from "./base-repository";
import axios from "axios";
import { Candle } from "../../domain/entities/candle";
import { CandleProps } from "../../domain/port/entities/candle.port";

export class CandleRepository extends BaseRepository implements CandleRepositoryInterface {
  public async get(exchange: Exchange, startDate: Date, endDate: Date, pair: ExchangePair):Promise<Candle[]> {
    const response = await axios.post<{candles: Candle[]}>('http://localhost:4242/candles', { sDate: startDate, eDate: endDate, pair })
    return response.data.candles.map(((candle:CandleProps) => new Candle({
      openAt : new Date(candle.openAt),
      closeAt :new Date(candle.closeAt),
      open : candle.open,
      close : candle.close,
      high : candle.high,
      low : candle.low,
      volume : candle.volume,
      exchange : "binance",
      interval: "1m"
    })));
  }
}