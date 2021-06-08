export interface BullishIndicatorParameters {}

interface Values {
  open: number[];
  high: number[];
  low: number[];
  close: number[];
}

export type BullishIndicatorOutput = boolean;

export interface BullishMethod {
  (parameters : BullishIndicatorParameters & Values): BullishIndicatorOutput;
};

export interface BullishIndicator {
  name : "bullish";
  method : BullishMethod;
  parameters : {}
}