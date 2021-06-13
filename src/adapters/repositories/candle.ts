import { Exchange } from "../../domain/entities/exchange";
import { ExchangePair } from "../../domain/port/entities/exchange.port";
import { CandleRepositoryInterface } from "../../domain/port/repositories/candle";
import { BaseRepository } from "./base-repository";
import axios from "axios";
import { Candle } from "../../domain/entities/candle";
import { CandleProps } from "../../domain/port/entities/candle.port";
import CandleMapper from "../mappers/candle.mapper";

export class CandleRepository extends BaseRepository implements CandleRepositoryInterface {
  public async get(exchange: Exchange, startDate: Date, endDate: Date, pair: ExchangePair):Promise<Candle[]> {
    const response = await axios.post<{candles: Candle[]}>(this.BASE_URL + "/candles", { sDate: startDate, eDate: endDate, pair })
    return response.data.candles.map((candle: CandleProps) => CandleMapper.toDomain({...candle, exchange : "binance", interval: "1m"}))
  }
}