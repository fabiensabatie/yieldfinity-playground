import { TextField } from "@material-ui/core";
import RefreshIcon from '@material-ui/icons/Refresh';
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { ExchangePair } from "yieldfinity";
import { Store } from "../../store";
import { CandleChart } from "../components/charts/candle-chart";
import ResponsiveDateRangePicker from "../components/commons/date-picker.component";
import { PositionList } from "../components/positions/list";
import { PositionResults } from "../components/positions/results";
import Editor from "../components/code-editor/editor/Editor";
import { Upload } from "../components/commons/json-reader.component";
import backtest from "../../../domain/example";
import { ExchangePairList } from "../../../domain/port/entities/exchange.port";
backtest();

export const ChartPage: React.FunctionComponent = () => {

  const [startDate, setStartDate] = useState<Date>(new Date('2021-01-07'));
  const [endDate, setEndDate] = useState<Date>(new Date('2021-01-28'));
  const [pair, setPair] = useState<ExchangePair>("BTCUSDT");
  const [inputPairValue, setInputPairValue] = useState<ExchangePair>(pair);
  const setCandles = Store.candles(state => state.set);
  const candles = Store.candles(state => state.candles);
  const orders = Store.positions(state => state.positions);
  const loading = Store.candles(state => state.loading);
  
  const getCandles:Function = () => setCandles(startDate, endDate, pair);

  useEffect(() =>  getCandles(), [])

  return (
    <div className="w-full h-full  flex flex-col">
      {loading ? <div className="relative top-0 bottom-0 l-0 r-0 m-auto" style={{width: 150, height: 150}}>
        <img src="/images/loader.gif" alt="loader"></img>
        </div> : ""}
      { !loading && 
          <div className="flex w-full h-full">
            <div className="w-3/6 h-full flex flex-col justify-between">
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
          </div>
            <div className="w-3/6 h-full">
              <Editor id="code_editor" modelsInfo={[{filename: "startegy.ts", value : "", language: "typescript"}]} />
            </div>
          </div>}
    </div>
  );
};
