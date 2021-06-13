import { TextField } from "@material-ui/core";
import RefreshIcon from '@material-ui/icons/Refresh';
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
// import MockCandleData from "../../../adapters/repositories/mock-data/candles.json";
import MockOrderData from "../../../adapters/repositories/mock-data/orders.json";
// import { Candle } from "../../../domain/entities/candle";
import { ExchangePair, ExchangePairList } from "../../../domain/port/entities/exchange.port";
import { Position } from "../../../domain/port/entities/position.port";
import { Store } from "../../store";
import { CandleChart } from "../components/charts/candle-chart";
import { Upload } from "../components/commons/json-reader.component";
import ResponsiveDateRangePicker from "../components/commons/date-picker.component";
import { PositionList } from "../components/positions/list";
import { PositionResults } from "../components/positions/results";

const orders:Position[] = JSON.parse(JSON.stringify(MockOrderData)).map((order:any) => ({...order, state : { ...order.state, openAt : new Date(order.state.openAt), closeAt: new Date(order.state.closeAt)}}))
// const mockCandles:Candle[] = JSON.parse(JSON.stringify(MockCandleData)).map((candle:any) => ({...candle, openAt : new Date(candle.openAt), closeAt: new Date(candle.closeAt)}))

export const ChartPage: React.FunctionComponent = () => {
  const [startDate, setStartDate] = useState<Date>(new Date('2021-04-02'));
  const [endDate, setEndDate] = useState<Date>(new Date('2021-04-20'));
  const [pair, setPair] = useState<ExchangePair>("ETHUSDT");
  const [inputPairValue, setInputPairValue] = useState<ExchangePair>(pair);
  const setCandles = Store.candles(state => state.set);
  const candles = Store.candles(state => state.candles);
  const loading = Store.candles(state => state.loading);
  
  const getCandles:Function = () => setCandles(startDate, endDate, pair);

  useEffect(() =>  getCandles(), [])

  return (
    <div className="w-full h-full  flex flex-col">
      {loading ? <div className="relative top-0 bottom-0 l-0 r-0 m-auto" style={{width: 150, height: 150}}>
        <img src="/images/loader.gif" alt="loader"></img>
        </div> : ""}
      { !loading && 
        <div className="h-full w-full flex flex-col justify-between">
          <div className="w-full flex justify-between p-10">
            <Upload />
            <div className="w-full flex">
              <Autocomplete
                value={pair} onChange={(event, value:string | null) => { setPair(value as ExchangePair || pair); }}
                inputValue={inputPairValue} onInputChange={(event, value:string) => { setInputPairValue(value as ExchangePair || ""); }}
                id="pair-selector" options={ExchangePairList} style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Pair" variant="outlined" />}
              />
              <ResponsiveDateRangePicker updateStartDate={setStartDate} updateEndDate={setEndDate} startDate={startDate} endDate={endDate} />
              <RefreshIcon className="mt-3 cursor-pointer" onClick={() => getCandles()}></RefreshIcon>
            </div>
          </div>
          <div className="flex h-3/6 pb-0">
            <div className="w-4/6  pl-10">
              <div className="w-full h-full rounded-huge shadow-videocard overflow-hidden">
                <div className="w-full h-full">
                <CandleChart positions={orders} indicators={[]} candles={candles}></CandleChart>
                </div>
              </div>
            </div>
            <div className="w-2/6 px-10">
              <div className="w-full h-full rounded-huge shadow-videocard overflow-hidden">
                <PositionResults positions={orders}></PositionResults>
              </div>
            </div>
          </div>
          <div className="w-full h-2/6 p-10">
            <div className="w-full h-full rounded-huge shadow-videocard overflow-hidden">
              <div className="w-full h-full">
                <PositionList positions={orders}></PositionList>
              </div>
            </div>
          </div>
      </div>}
    </div>
  );
};
