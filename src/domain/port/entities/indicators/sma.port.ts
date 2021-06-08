import { Values } from "../indicator.port";

export interface SMAIndicatorParameters {
  period: number
}

export type SMAIndicatorOutput = number[];

export interface SMAMethod {
  (parameters : SMAIndicatorParameters & Values): SMAIndicatorOutput;
};

export interface SMAIndicator {
  name : "sma";
  method : SMAMethod;
  parameters : SMAIndicatorParameters
}