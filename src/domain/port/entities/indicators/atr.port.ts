export interface ATRIndicatorParameters {
  period: number;
}

export interface ATRValues {
  low: number[];
  high: number[];
  close: number[];
}

export type ATRIndicatorOutput = number[];

export interface ATRMethod {
  (parameters : ATRIndicatorParameters & ATRValues): ATRIndicatorOutput;
};

export interface ATRIndicator {
  name : "atr";
  method : ATRMethod;
  parameters : {}
}