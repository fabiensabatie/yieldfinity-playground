export interface BearishIndicatorParameters {}

interface Values {
  open: number[];
  high: number[];
  low: number[];
  close: number[];
}

export type BearishIndicatorOutput = boolean;

export interface BearishMethod {
  (parameters : BearishIndicatorParameters & Values): BearishIndicatorOutput;
};

export interface BearishIndicator {
  name : "bearish";
  method : BearishMethod;
  parameters : {}
}