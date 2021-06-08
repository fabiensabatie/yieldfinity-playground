import { Values } from "../indicator.port";

export interface EMAIndicatorParameters {
  period: number
}

export type EMAIndicatorOutput = number[];
export interface EMAMethod {
  (parameters : EMAIndicatorParameters & Values): EMAIndicatorOutput;
};

export interface EMAIndicator {
  name : "ema";
  method : EMAMethod;
  parameters : EMAIndicatorParameters
}