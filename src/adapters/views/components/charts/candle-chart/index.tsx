import { createChart } from "lightweight-charts";
import React, { useEffect, useRef, useState } from "react";
import ResizeSensor from "resize-sensor";
import { Candle, ExchangeInterval, Indicator, Position } from "yieldfinity";
import { PlaygroundCandle } from "../../../../../domain/entities/candle";
import { buildChartOptions, CandleStickMapper, candleStickOptions } from "./utils";

interface CandleChartProps {
  candles: Candle[];
  positions: Position[];
  indicators: Indicator[];
}


export const CandleChart = ({ candles, positions, indicators}: CandleChartProps) => {
  const chartRef = useRef<any>();
  const [currentInterval, setInt] = useState("1m");
  const [intervalCandles, setIntervalCandles] = useState(PlaygroundCandle.withInterval(candles, currentInterval as ExchangeInterval))
  const [chart, setChart] = useState<any>(null);
  const [series, setSeries] = useState<any>(null);

  useEffect(() => {
    setIntervalCandles(PlaygroundCandle.withInterval(candles, currentInterval as ExchangeInterval))
  }, [candles, currentInterval])

  useEffect(() => {
    new ResizeSensor(document.querySelector('#chart-container'), () => {
      const chartDOM = document.querySelector('#chart-container')  as HTMLElement;
      if (chart && chartDOM) chart.resize(chartDOM.clientWidth - 40, chartDOM.clientHeight - 40)
    })
  }, [chart])

  useEffect(() => {
    if (!chartRef.current) return;
    if (!chart) setChart(createChart(chartRef.current, buildChartOptions(chartRef.current.clientWidth, chartRef.current.clientHeight)));
    else {
      if (series) chart.removeSeries(series);
      const currentSeries = chart.addCandlestickSeries(candleStickOptions);
      currentSeries.setData(CandleStickMapper.toChart(intervalCandles));
      setSeries(currentSeries);
      const currentMakers = positions.reduce((positions:any, position) => {
        if (!position.state.openAt || !position.state.closeAt) return positions;
        positions.push({
          time: position.state.openAt.getTime() / 1000,
          position: position.side === "long" ? "belowBar" : "aboveBar",
          color:  position.side === "long" ? "#46e60b" : "black",
          shape: position.side === "long" ? "arrowUp" : "arrowDown",
          text: position.side === "long" ? "Buy" : "Sell",
        })
        positions.push({
          time: position.state.closeAt.getTime() / 1000,
          position: position.side === "short" ? "belowBar" : "aboveBar",
          color: position.side === "short" ? "#46e60b" : "black",
          shape: position.side === "short" ? "arrowUp" : "arrowDown",
          text: position.side === "short" ? "Buy" : "Sell",
        })
        return positions;
      }, [])
      currentSeries.setMarkers(currentMakers);
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candles, chart, intervalCandles]);
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <div className="text-white font-bold bg-black-primary px-6 py-2 w-full text-sm uppercase flex justify-between">
      {["1m", "3m", "5m", "15m", "30m", "1h", "2h", "4h", "8h", "12h", "1d"].map(interval =>
        <span key={interval} className={"w-full cursor-pointer " + (interval === currentInterval ? "font-bold" : "font-light")} onClick={(() => setInt(interval))}>{interval}</span>  
      )}
      </div>
      <div className="w-full h-full p-5" id="chart-container">
        <div className="w-full h-full" ref={chartRef} id="chart"></div>
      </div>
    </div>
  );
};
