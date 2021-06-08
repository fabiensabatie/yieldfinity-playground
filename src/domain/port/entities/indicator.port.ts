import { IndicatorMethodParametersMapperInterface } from "../mappers/indicator-method-parameters-mapper.port";
import { BearishIndicator, BearishIndicatorOutput, BearishIndicatorParameters } from "./indicators/bearish.port";
import { BullishIndicator, BullishIndicatorOutput, BullishIndicatorParameters } from "./indicators/bullish.port";
import { EMAIndicator, EMAIndicatorOutput, EMAIndicatorParameters } from "./indicators/ema.port";
import { MACDIndicator, MACDIndicatorOutput, MACDIndicatorParameters } from "./indicators/macd.port";
import { RSIIndicator, RSIIndicatorOutput, RSIIndicatorParameters } from "./indicators/rsi.port";
import { SMAIndicator, SMAIndicatorOutput, SMAIndicatorParameters } from "./indicators/sma.port";

// export const IndicatorNames = ["sma" , "ema" , "wma" , "wema" , "macd" , "rsi" , "bollingerbands" , "adx" , "atr" , "truerange" , "roc" , "kst" , "psar" , "stochastic" , "williamsr" , "adl" , "obv" , "trix" , "forceindex" , "cci" , "awesomeoscillator" , "vwap" , "volumeprofile" , "mfi" , "stochasticrsi" , "averagegain" , "averageloss" , "sd" , "highest" , "lowest" , "sum" , "FixedSizeLinkedList" , "renko" , "HeikinAshi" , "bullish" , "bearish" , "abandonedbaby" , "doji" , "bearishengulfingpattern" , "bullishengulfingpattern" , "darkcloudcover" , "downsidetasukigap" , "dragonflydoji" , "gravestonedoji" , "bullishharami" , "bearishharami" , "bullishharamicross" , "bearishharamicross" , "eveningdojistar" , "eveningstar" , "morningdojistar" , "morningstar" , "bullishmarubozu" , "bearishmarubozu" , "piercingline" , "bullishspinningtop" , "bearishspinningtop" , "threeblackcrows" , "threewhitesoldiers" , "bullishhammerstick" , "bearishhammerstick" , "bullishinvertedhammerstick" , "bearishinvertedhammerstick" , "hammerpattern" , "hammerpatternunconfirmed" , "hangingman" , "hangingmanunconfirmed" , "shootingstar" , "shootingstarunconfirmed" , "tweezertop" , "tweezerbottom" , "fibonacciretracement" , "ichimokucloud" , "keltnerchannels" , "chandelierexit" , "crossUp" , "crossDown"] as const;

export const IndicatorNames = ["sma", "ema", "rsi", "macd", "bearish", "bullish"] as const;
export type Indicators = typeof IndicatorNames[number];
export type IndicatorProps = SMAIndicator | EMAIndicator | RSIIndicator | MACDIndicator | BearishIndicator | BullishIndicator;
export type IndicatorParameters = SMAIndicatorParameters | EMAIndicatorParameters | RSIIndicatorParameters | MACDIndicatorParameters | BearishIndicatorParameters | BullishIndicatorParameters;
export type IndicatorOutputs = SMAIndicatorOutput | EMAIndicatorOutput | RSIIndicatorOutput | MACDIndicatorOutput | BearishIndicatorOutput | BullishIndicatorOutput;
export interface Values { values: number[]; }

export interface IndicatorDependencies {
  mapper: IndicatorMethodParametersMapperInterface;
}