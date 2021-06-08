import { Values } from "../indicator.port";

export interface RSIIndicatorParameters {
  period: number
}

export type RSIIndicatorOutput = number[];

export interface RSIMethod {
  (parameters : RSIIndicatorParameters & Values): RSIIndicatorOutput;
};

export interface RSIIndicator {
  name : "rsi";
  method : RSIMethod;
  parameters : RSIIndicatorParameters
}