import { Comparer, ComparerMode, ComparerOperand, StrategyIndicatorTriggerProps } from "../port/entities/strategy-indicator-trigger.port";
import { Indicator } from "./indicator";

export class StrategyIndicatorTrigger {
  constructor(private props: StrategyIndicatorTriggerProps) {}

  get indicator() : Indicator { return this.props.indicator };
  get field(): string { return this.props.field };
  get date() : Date { return this.props.date };
  get comparer() : Comparer { return this.props.comparer };
  get operand() : ComparerOperand { return this.props.operand };
  get value() : number { return this.props.value };
  get mode() : ComparerMode { return this.props.mode };

}