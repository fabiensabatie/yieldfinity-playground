import { Candle } from "../../domain/entities/candle";
import { Values } from "../../domain/port/entities/indicator.port";
import { BearishIndicatorParameters } from "../../domain/port/entities/indicators/bearish.port";
import { BullishIndicatorParameters } from "../../domain/port/entities/indicators/bullish.port";
import { EMAIndicatorParameters } from "../../domain/port/entities/indicators/ema.port";
import { MACDIndicatorParameters } from "../../domain/port/entities/indicators/macd.port";
import { RSIIndicatorParameters } from "../../domain/port/entities/indicators/rsi.port";
import { SMAIndicatorParameters } from "../../domain/port/entities/indicators/sma.port";
import { IndicatorMethodParametersMapperInterface } from "../../domain/port/mappers/indicator-method-parameters-mapper.port";

export class IndicatorMethodParametersMapper implements IndicatorMethodParametersMapperInterface {
  sma(param: {parameters: SMAIndicatorParameters, candles: Candle[]}): SMAIndicatorParameters & Values {
    return ({...param.parameters, values: param.candles.map(c => c.open)})
  }
  ema(param: {parameters: EMAIndicatorParameters, candles: Candle[]}): EMAIndicatorParameters & Values {
    return ({...param.parameters, values: param.candles.map(c => c.open)})
  }
  rsi(param: {parameters: RSIIndicatorParameters, candles: Candle[]}): RSIIndicatorParameters & Values {
    return ({...param.parameters, values: param.candles.map(c => c.open)})
  }
  macd(param: {parameters: MACDIndicatorParameters, candles: Candle[]}): MACDIndicatorParameters & Values {
    return ({...param.parameters, values: param.candles.map(c => c.open)})
  }
  bearish(param: {candles: Candle[]}): BearishIndicatorParameters {
    return ({ open: param.candles.map(({open}) => open), high: param.candles.map(({high}) => high), low: param.candles.map(({low}) => low), close: param.candles.map(({close}) => close) })
  }
  bullish(param: {candles: Candle[]}): BullishIndicatorParameters {
    return ({ open: param.candles.map(({open}) => open), high: param.candles.map(({high}) => high), low: param.candles.map(({low}) => low), close: param.candles.map(({close}) => close) })
  }
}