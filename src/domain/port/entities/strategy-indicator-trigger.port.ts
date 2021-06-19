import { Indicator } from "../../entities/indicator";
import { StrategyIndicatorTrigger } from "../../entities/strategy-indicator-trigger";

const ComparerList = ["<" , ">" , "<=" , "=>" , "="];
const ComparerModeList = ["number", "percentage"];
const ComparerOperandList = ["and", "or"];

export type Comparer = typeof ComparerList[number];
export type ComparerMode = typeof ComparerModeList[number];
export type ComparerOperand = typeof ComparerOperandList[number];

export interface StrategyIndicatorTriggerProps {
  indicator : Indicator;
  field: string;
  date : Date;
  comparer : Comparer;
  operand : ComparerOperand;
  value : number;
  mode : ComparerMode;
}