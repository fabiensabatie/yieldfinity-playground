# Importing your positions
You must provide a valid JSON file containing an array of orders : 

```ts
[{
	side : "bid",
	pair : "BTCUSDT",
	quantity: 1,
	price: 10000,
	state: {
		openAt: "2021-04-01T00:06:00.000Z",
		closeAt: "2021-04-29T00:06:00.000Z",
		fee": 0.8,
		profit: 5358
	}
}]
```