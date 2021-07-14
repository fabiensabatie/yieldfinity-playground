import { TextField } from "@material-ui/core";
import RefreshIcon from '@material-ui/icons/Refresh';
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState, useRef } from "react";
import { ExchangePair } from "yieldfinity";
import { Store } from "../../store";
import { CandleChart } from "../components/charts/candle-chart";
import ResponsiveDateRangePicker from "../components/commons/date-picker.component";
import { PositionList } from "../components/positions/list";
import { StrategyResults } from "../components/positions/results";
import Editor from "../components/code-editor/editor/Editor";
import { Upload } from "../components/commons/json-reader.component";
import { ExchangePairList } from "../../../domain/port/entities/exchange.port";
import { codeContent } from "./example";
const Embed = require('react-runkit')


export const ChartPage: React.FunctionComponent = () => {

  const [startDate, setStartDate] = useState<Date>(new Date('2021-01-07'));
  const [endDate, setEndDate] = useState<Date>(new Date('2021-01-28'));
  const [pair, setPair] = useState<ExchangePair>("BTCUSDT");
  const [inputPairValue, setInputPairValue] = useState<ExchangePair>(pair);
  const setCandles = Store.candles(state => state.set);
  const consoleCode = Store.strategies(state => state.console);
  const showConsole  = Store.strategies(state => state.showConsole);
  const candles = Store.candles(state => state.candles);
  const orders = Store.positions(state => state.positions);
  const loading = Store.candles(state => state.loading);
  const consoleLoading = Store.strategies(state => state.loading);

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
                <div className="w-full flex items-center justify-between">
                  <Autocomplete
                    value={pair} onChange={(event, value:string | null) => { setPair(value as ExchangePair || pair); }}
                    inputValue={inputPairValue} onInputChange={(event, value:string) => { setInputPairValue(value as ExchangePair || ""); }}
                    id="pair-selector" options={ExchangePairList} style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Pair" variant="outlined" />}
                  />
                  <div style={{width: 290}}>
                    <ResponsiveDateRangePicker updateStartDate={setStartDate} updateEndDate={setEndDate} startDate={startDate} endDate={endDate} />
                  </div>
                  <RefreshIcon className="cursor-pointer" onClick={() => getCandles()}></RefreshIcon>
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
                  <StrategyResults></StrategyResults>
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
            <div className="w-3/6 h-full flex flex-col">
              <div className="z-9999" style={{height: "calc(100% - 280px)"}}>
                <Editor id="code_editor" modelsInfo={[{filename: "startegy.ts", value : codeContent, language: "typescript"}]} />
              </div>
              { consoleLoading && <div className="relative top-0 bottom-0 l-0 r-0 m-auto" style={{width: 150, height: 150}}>
                <img src="/images/loader.gif" alt="loader"></img>
              </div> }
              { !showConsole && !consoleLoading && <div className="w-full text-center font-light p-4 box-border mt-20">
                  Run your code to show the console.
                </div>
              }
              <div className={"z-1 absolute " + (showConsole ? "" : "invisible")} style={{bottom : "40px", width: "50%"}}>
                <Embed source={ consoleCode || "console.log(2);" } className="h-full"  nodeVersion="14" gutterStyle="inside" mode="endpoint"  />
              </div>
          </div>
        </div>}
    </div>
  );
};
