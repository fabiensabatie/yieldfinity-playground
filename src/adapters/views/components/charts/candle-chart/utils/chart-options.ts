export function buildChartOptions(width: number, height: number) {
  return ({
    width, height,
    rightPriceScale: { scaleMargins: { top: 0.3, bottom: 0.25, }, borderVisible: false },
    layout: { backgroundColor: "white", textColor: "#690F50" },
    grid: { vertLines: { color: "rgba(42, 46, 57, 0)" }, horzLines: { color: "rgba(42, 46, 57, 0.1)" } },
    timeScale: { timeVisible: true, secondsVisible: false },
  })
}
