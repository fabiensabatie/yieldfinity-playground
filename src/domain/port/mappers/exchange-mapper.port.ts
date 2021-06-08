import { Candle } from "../../entities/candle";

interface CandleMapper {
  toDomain(candle: string[]): Candle
}

export interface ExchangeMapper {
  candles : CandleMapper;
}