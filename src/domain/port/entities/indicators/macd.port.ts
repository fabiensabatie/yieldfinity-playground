import { Values } from "../indicator.port";

export interface MACDIndicatorParameters {
  SimpleMAOscillator: boolean;
  SimpleMASignal: boolean;
  fastPeriod: number;
  slowPeriod: number;
  signalPeriod: number;
}

export type MACDIndicatorOutput = {
  MACD?: number;
  signal?: number;
  histogram?: number;
};

export interface MACDMethod {
  (parameters : MACDIndicatorParameters & Values): MACDIndicatorOutput[];
};

export interface MACDIndicator {
  name : "macd";
  method : MACDMethod;
  parameters : MACDIndicatorParameters
}