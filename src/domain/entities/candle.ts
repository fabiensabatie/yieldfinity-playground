import { CandleProps } from "../port/entities/candle.port";
import { ExchangeInterval } from "../port/entities/exchange.port";
import moment, {Moment} from "moment";

function nearestFutureMinutes(interval: number, moment: Moment){
  const roundedMinutes = Math.ceil(moment.minute() / interval) * interval;
  return moment.clone().minute(roundedMinutes).second(0);
}

const DeltaMap:any = {
  "1m" : {
    date : (date: Date):any => nearestFutureMinutes(1, moment(date)),
    delta : 1
  },
  "3m" : {
    date : (date: Date) => nearestFutureMinutes(3, moment(date)),
    delta : 3
  },
  "5m" : {
    date : (date: Date) => nearestFutureMinutes(5, moment(date)),
    delta : 5
  },
  "15m" : {
    date : (date: Date) => nearestFutureMinutes(15, moment(date)),
    delta : 15
  },
  "30m" : {
    date : (date: Date) => nearestFutureMinutes(30, moment(date)),
    delta : 30
  },
  "1h" : {
    date : (date: Date) => nearestFutureMinutes(60, moment(date)),
    delta : 60
  },
  "2h" : {
    date : (date: Date) => nearestFutureMinutes(120, moment(date)),
    delta : 120
  },
  "4h" : {
    date : (date: Date) => nearestFutureMinutes(60 * 4, moment(date)),
    delta : 240
  },
  "8h" : {
    date : (date: Date) => nearestFutureMinutes(60 * 8, moment(date)),
    delta : 480
  },
  "12h" : {
    date : (date: Date) => nearestFutureMinutes(60 * 12, moment(date)),
    delta : 60 * 12
  },
  "1d" : {
    date : (date: Date) => nearestFutureMinutes(60 * 24, moment(date)),
    delta : 60 * 24
  }
};

/**
 * Returns an array with arrays of the given size.
 *
 * @param myArray {Array} array to split
 * @param chunk_size {Integer} Size of every group
 */
 function chunkArray(myArray:any[], chunk_size: number){
  var index = 0;
  var arrayLength = myArray.length;
  var tempArray = [];
  
  for (index = 0; index < arrayLength; index += chunk_size) {
      let myChunk = myArray.slice(index, index+chunk_size);
      // Do something if you want with the group
      tempArray.push(myChunk);
  }

  return tempArray;
}


export class Candle {

  constructor(private props: CandleProps) {}

  get openAt() : Date { return this.props.openAt };
  get closeAt() : Date { return this.props.closeAt };
  get open() : number { return this.props.open };
  get close() : number { return this.props.close };
  get high() : number { return this.props.high };
  get low() : number { return this.props.low };
  get volume() : number { return this.props.volume };
  get exchange() : string { return this.props.exchange };
  get interval() : ExchangeInterval { return this.props.interval };
  get fields() : CandleProps { return this.props };

  public static withInterval(candles: Candle[], interval: ExchangeInterval){
    if (interval === "1m" || !candles.length) return candles;
    const sortedCandles = [...candles].sort((a, b) => b.openAt.getTime() - a.openAt.getTime());
    const startDate: Moment = DeltaMap[interval].date(sortedCandles[0].openAt);
    const delta: number = DeltaMap[interval].delta;
    const startTime = startDate.toDate().getTime();

    const filteredCandles = candles.filter(candle => candle.openAt.getTime() >= startTime / 1000);
    const chunkedCandlesArray = chunkArray(filteredCandles, delta);
    return chunkedCandlesArray.map((chunkedCandles: Candle[]) => {
      const candle =  new Candle(chunkedCandles.reduce((props, candle, i) => {
        const sum = {
          ...props,
          close : candle.close, volume : (candle?.volume || 0) + (props?.volume || 0),
          high : candle.high > props.high ? candle.high : props.high,
          low : candle.low < props.low ? candle.low : props.low,
        };
        return (i !== chunkedCandles.length -1) ? sum : { ...sum, volume : sum.volume / chunkedCandles.length }
      }, chunkedCandles[0].fields))
      return candle;
    })
  }
}