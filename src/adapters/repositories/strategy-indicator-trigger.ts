import axios from "axios";
import { StrategyIndicatorTrigger } from "../../domain/entities/strategy-indicator-trigger";
import { StrategyIndicatorTriggerRepositoryInterface } from "../../domain/port/repositories/strategy-indicator-trigger";
import { BaseRepository } from "./base-repository";

export class StrategyIndicatorTriggerRepository extends BaseRepository implements StrategyIndicatorTriggerRepositoryInterface {
  public async get():Promise<StrategyIndicatorTrigger[]> {
    const response = await axios.get<{[indicator: string]: string[]}>(this.BASE_URL + "/indicators/available");
    return []
    // return response.data.candles.map((candle: CandleProps) => CandleMapper.toDomain({...candle, exchange : "binance", interval: "1m"}))
  }
}