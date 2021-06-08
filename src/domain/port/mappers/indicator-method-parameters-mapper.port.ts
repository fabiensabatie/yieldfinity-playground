import { Candle } from "../../entities/candle";
import { IndicatorParameters, Values } from "../entities/indicator.port";
import { BearishIndicatorParameters } from "../entities/indicators/bearish.port";
import { BullishIndicatorParameters } from "../entities/indicators/bullish.port";
import { EMAIndicatorParameters } from "../entities/indicators/ema.port";
import { MACDIndicatorParameters } from "../entities/indicators/macd.port";
import { RSIIndicatorParameters } from "../entities/indicators/rsi.port";
import { SMAIndicatorParameters } from "../entities/indicators/sma.port";


export type IndicatorMethod = keyof IndicatorMethodParametersMapperInterface;

export interface IndicatorMethodParametersMapperInterface {
  sma(param: {parameters: IndicatorParameters, candles: Candle[]}): SMAIndicatorParameters & Values;
  ema(param: {parameters: IndicatorParameters, candles: Candle[]}): EMAIndicatorParameters & Values;
  rsi(param: {parameters: IndicatorParameters, candles: Candle[]}): RSIIndicatorParameters & Values;
  macd(param: {parameters: IndicatorParameters, candles: Candle[]}): MACDIndicatorParameters & Values;
  bearish(param: {candles: Candle[]}): BearishIndicatorParameters;
  bullish(param: {candles: Candle[]}): BullishIndicatorParameters;
}