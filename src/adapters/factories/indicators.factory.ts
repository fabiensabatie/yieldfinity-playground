import { Indicator } from "../../domain/entities/indicator";
import { SMAIndicatorParameters } from "../../domain/port/entities/indicators/sma.port";
import * as IndicatorsRepository from "technicalindicators";
import { IndicatorsFactory, IndicatorsFactoryProps } from "../../domain/port/factories/indicators.factory";
import { EMAIndicatorParameters } from "../../domain/port/entities/indicators/ema.port";
import { RSIIndicatorParameters } from "../../domain/port/entities/indicators/rsi.port";
import { MACDIndicatorParameters } from "../../domain/port/entities/indicators/macd.port";

export class Indicators implements IndicatorsFactory {
  constructor(private dependencies : IndicatorsFactoryProps) {}

  sma(parameters: SMAIndicatorParameters): Indicator {
    return new Indicator({name: "sma", method: IndicatorsRepository.sma, parameters}, { mapper: this.dependencies.mapper })
  }
  ema(parameters: EMAIndicatorParameters): Indicator {
    return new Indicator({name: "ema", method: IndicatorsRepository.ema, parameters}, { mapper: this.dependencies.mapper })
  }
  rsi(parameters: RSIIndicatorParameters): Indicator {
    return new Indicator({name: "rsi", method: IndicatorsRepository.rsi, parameters}, { mapper: this.dependencies.mapper })
  }
  macd(parameters: MACDIndicatorParameters): Indicator {
    return new Indicator({name: "macd", method: IndicatorsRepository.macd, parameters}, { mapper: this.dependencies.mapper })
  }
  bearish(): Indicator {
    return new Indicator({name: "bearish", method: IndicatorsRepository.bearish, parameters : {}}, { mapper: this.dependencies.mapper })
  }
  bullish(): Indicator {
    return new Indicator({name: "bullish", method: IndicatorsRepository.bullish, parameters : {}}, { mapper: this.dependencies.mapper })
  }
}