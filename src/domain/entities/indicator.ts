
import { IndicatorDependencies, IndicatorOutputs, IndicatorParameters, IndicatorProps, Indicators } from "../port/entities/indicator.port";
import { IndicatorMethod } from "../port/mappers/indicator-method-parameters-mapper.port";
import { Candle } from "./candle";

export type IndicatorsList = { [key in Indicators] : Indicator[] }

export class Indicator {

  private generated:IndicatorOutputs = [];
  constructor(private props: IndicatorProps, private dependencies: IndicatorDependencies) {}

  public get method(): Function { return this.props.method; }
  public get name(): string { return this.props.name; }
  public get values():IndicatorOutputs { return this.generated; }
  public get parameters(): IndicatorParameters  { return this.props.parameters; }
  
  public generate(candles: Candle[]) {
    const parameters:IndicatorParameters = this.dependencies.mapper[this.name as IndicatorMethod]({
      parameters : this.props.parameters,
      candles
    });
    this.generated = this.method(parameters);
    return this.generated;
  }
}
