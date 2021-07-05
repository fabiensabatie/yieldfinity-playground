import moment from "moment";
import { Position } from "yieldfinity";

interface Props {
  positions: Position[]
}

export const PositionList = ({ positions }: Props) => {

  return (
    <div className="w-full h-full"  style={{maxHeight: 500}}>
     <div className="text-white bg-black-primary w-full px-6 py-2 text-center flex justify-between">
        <span className="text-sm uppercase w-full">Pair</span>
        <span className="text-sm uppercase w-full">Side</span>
        <span className="text-sm uppercase w-full">Opened at</span>
        <span className="text-sm uppercase w-full">Closed at</span>
        <span className="text-sm uppercase w-full">Fees</span>
        <span className="text-sm uppercase w-full">Price</span>
        <span className="text-sm uppercase w-full">Quantity</span>
        <span className="text-sm uppercase w-full">Profit</span>
        <span className="text-sm uppercase w-full">PNL (%)</span>
      </div>
      <div className="border-solid border-b-2 border-black-primary w-full" style={{height: 1}}></div>
      { positions.length ? 
        <div className="overflow-y-scroll items-around w-full flex flex-col h-full pb-10" >
        {positions.map((position, i) => (
          <div className="text-primary w-full px-6 py-5 text-center text-base flex justify-between border-b border-solid border-black-input" style={{minHeight: 50}}  key={i}>
            <span className="w-full text-sm font-bold">{position.pair}</span>
            <span className={"w-full text-sm uppercase font-bold " + (position.side === "ask" ? "text-green" : "text-red")}>{position.side}</span>
            <span className="w-full text-sm">{moment(position.state.openAt).format("YYYY/mm/DD HH:MM:SS")}</span>
            <span className="w-full text-sm">{moment(position.state.closeAt).format("YYYY/mm/DD HH:MM:SS")}</span>
            <span className={"w-full font-bold text-sm"}>{position.state.fee}</span>
            <span className={"w-full font-bold text-sm"}>{position.price}</span>
            <span className={"w-full font-bold text-sm"}>{position.quantity}</span>
            <span className={"w-full font-bold text-sm " + (position.state.profit > 0 ? "text-green" : "text-red")}>{position.state.profit.toFixed(2)}</span>
            <span className={"w-full font-bold text-sm " + (position.state.pnl > 0 ? "text-green" : "text-red")}>{position.state.pnl.toFixed(2) }%</span>
          </div>
        ))}
        </div> : <div className="w-full m-4">Import your backtesting positions to see your results</div>
        }
    </div>
  );
};