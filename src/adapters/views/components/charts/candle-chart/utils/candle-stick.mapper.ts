import { UTCTimestamp } from "lightweight-charts";
import { Candle } from "../../../../../../domain/entities/candle";
import { CandleStick } from "../entities/candlestick";

export const CandleStickMapper = Object.freeze({
  toChart(candles: Candle[]):CandleStick[] {
    return candles.map((candle, i) =>   ({
      time: candle.openAt.getTime() / 1000 as UTCTimestamp,
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close
    }))
  }
})