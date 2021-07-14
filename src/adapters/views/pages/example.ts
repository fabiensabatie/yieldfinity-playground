export const codeContent = `
import { Binance, CustomTrigger, CustomTriggerFlow, CustomTriggerParameters, ExchangePair, Indicators, Strategy } from "yieldfinity";
import { Order, Position, StopLoss, TakeProfit } from "yieldfinity/orders";

const BasicStrategy = ({
  indicators : [price, sma],
  pair
} : CustomTriggerParameters):Position | false => {
  // We get yesterday's price
  const yesterdayPrice = price.values[price.lastIndex - 24 * 60] as number;
  
  if ((price.lastValue >=  10 * yesterdayPrice / 100 + yesterdayPrice) && (Math.ceil(price.lastValue) % 10 === 0))  
    return new Order({
      pair, price : "market", quantity : 0.0001, side:  "short",
      stopLoss : new StopLoss({ reference : "pnl", value: -10 }),
      takeProfit : new TakeProfit({ reference : "pnl", value: 20 })
    });
  return false;
}


const backtest = async () => {
  try {
    const pair: ExchangePair = "BTCUSDT";
    const sDate = new Date("2021-01-07");
    const eDate = new Date("2021-01-28");
    const binance = new Binance();
    const candles = await binance.getCandles(sDate, eDate, pair, "1m");
    // console.log(candles)
    const indicators = new Indicators();

    // Building the indicator
    const sma = indicators.sma({ period : 12 });
    const price = indicators.price({ mode: "high" });

    // We build the trigger flow
    const customTriggerFlow = new CustomTriggerFlow({
      triggers: [
        new CustomTrigger({ parameters: { indicators: [price, sma], pair }, method : BasicStrategy })]
    })

    // // Building the stategy & backtestnew Strategy({ indicators: [p
    const strategy = new Strategy({indicators: [price, sma], triggerFlow: customTriggerFlow, exchanges: [binance] });

    strategy.run(candles);
    const profit = strategy.profit;
    const pnl = strategy.pnl;
    console.log(strategy.profitablePositions.length, strategy.closedPositions.length, strategy.positions.length);
    const profitablePositions = Math.ceil(strategy.profitablePositions.length / (strategy.positions.length + strategy.closedPositions.length) * 100);
    console.log(\`Strategy made a profit of \${profit} (\${pnl}%) : \${profitablePositions}% of positions were profitable - \${strategy.capitalInvested}\`);
    
    return strategy;
  }
  catch (err) {
    console.log(err)
  }
}


`;