import { Indicator } from "../../entities/indicator";
import { EMAIndicatorParameters } from "../entities/indicators/ema.port";
import { MACDIndicatorParameters } from "../entities/indicators/macd.port";
import { RSIIndicatorParameters } from "../entities/indicators/rsi.port";
import { SMAIndicatorParameters } from "../entities/indicators/sma.port";
import { IndicatorMethodParametersMapperInterface } from "../mappers/indicator-method-parameters-mapper.port";

export interface IndicatorsFactoryProps {
  mapper: IndicatorMethodParametersMapperInterface;
}

export interface IndicatorsFactory {
  sma(parameters: SMAIndicatorParameters): Indicator;
  ema(parameters: EMAIndicatorParameters): Indicator;
  rsi(parameters: RSIIndicatorParameters): Indicator;
  macd(parameters: MACDIndicatorParameters): Indicator;
  bearish(): Indicator;
  bullish(): Indicator;
}