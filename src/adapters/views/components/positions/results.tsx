import { Position } from "../../../../domain/port/entities/position.port";
import Countup from "react-countup";

interface Props {
  positions: Position[]
}

export const PositionResults = ({ positions }: Props) => {

  const profit = positions.reduce((sum, order) =>  sum + order.state.profit, 0);
  const fee = positions.reduce((sum, order) =>  sum + order.state.fee, 0);
  const pnl = positions.reduce((sum, order) => (100 - (order.price - order.state.profit) / order.price * 100) + sum, 0) / positions.length;

  return (<div  className="w-full h-full">
    <div className="w-full p-3 bg-black-primary text-white text-sm uppercase">Backtest results</div>
    <div className="p-3 py-5">
      <div className="flex w-full">
        { positions.length ? <div className="w-full flex flex-col">
          <div className="w-full justify-between flex items-center"><span className="font-bold text-s uppercase">Total profit :</span><Countup end={profit} duration={2}></Countup></div>
          <div className="w-full justify-between flex items-center"><span className="font-bold text-s uppercase">Cumulative fees :</span><Countup end={fee} duration={2}></Countup></div>
          <div className={"w-full justify-between flex items-center"}>
            <span className="font-bold text-s uppercase">Total return :</span>
            <span className={"font-bold " + (pnl > 0 ? "text-green" : "text-red")}>{pnl.toFixed(2)}%</span>
          </div>
        </div> : <span className="w-full">Import your backtesting positions to see your results</span>
        }
      </div>
    </div>
  </div>
  );
};