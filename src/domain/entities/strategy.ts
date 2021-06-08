import { Candle } from "./candle";
import { Indicator, IndicatorsList } from "./indicator";
import { StrategyProps } from "../port/entities/strategy.port";

export class Strategy {

  constructor(private props: StrategyProps) { }

  get indicator() : Indicator[] { return this.props.indicators };
  get candles() : Candle[] { return this.props.candles };
  get indicators() : IndicatorsList {
    return this.props.indicators.reduce((map:IndicatorsList, indicator:Indicator) => {
      const name = indicator.name as keyof IndicatorsList;
      if (!map[name]) map[name] = [indicator];
      else map[name].push(indicator);
      return map;
    }, {} as IndicatorsList)
  } 

  public generateIndicators() {
    this.props.indicators.map(indicator => indicator.generate(this.props.candles));
  }
}