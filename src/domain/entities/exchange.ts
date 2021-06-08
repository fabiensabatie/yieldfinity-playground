import { ExchangeName, ExchangeProps } from "../port/entities/exchange.port"

export class Exchange {
  constructor(private props: ExchangeProps) {}

  get name() : ExchangeName { return this.props.name };
}