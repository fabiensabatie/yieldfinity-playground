import { Candle } from "../../domain/entities/candle";
import { CandleProps } from "../../domain/port/entities/candle.port";
import { ExchangePair } from "../../domain/port/entities/exchange.port";

const CandleMapper = {
  toDomain(candle: CandleProps) : Candle {
    return new Candle({
      openAt : new Date(candle.openAt),
      closeAt : new Date(candle.closeAt),
      open : candle.open,
      close : candle.close,
      high : candle.high,
      low : candle.low,
      volume : candle.volume,
      exchange : candle.exchange,
      interval:  candle.interval
    })
  }
}

export default  CandleMapper;