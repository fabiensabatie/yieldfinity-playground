import Countup from "react-countup";
import { Position, Strategy } from "yieldfinity";
import { Store } from "../../../store";


export const StrategyResults = () => {
  const results  = Store.strategies(state => state.results);
  console.log(results, "results")

  return (<div  className="w-full h-full">
    <div className="w-full p-3 bg-black-primary text-white text-sm uppercase">Backtest results</div>
    <div className="p-3 py-5">
      <div className="flex w-full">
        { results ? <div className="w-full flex flex-col">
          <div className="w-full justify-between flex items-center"><span className="font-bold text-s uppercase">Total profit :</span><Countup end={results.profit} duration={2}></Countup></div>
          <div className="w-full justify-between flex items-center"><span className="font-bold text-s uppercase">Capital invested :</span><Countup end={results.capitalInvested} duration={2}></Countup></div>
          <div className={"w-full justify-between flex items-center"}>
            <span className="font-bold text-s uppercase">Total return :</span>
            <span className={"font-bold " + (results.pnl > 0 ? "text-green" : "text-red")}>{results.pnl.toFixed(2)}%</span>
          </div>
        </div> : <span className="w-full">Import your backtesting positions to see your results</span>
        }
      </div>
    </div>
  </div>
  );
};