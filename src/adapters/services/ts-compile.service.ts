declare const window: any;

const TSCompileService = (tsCode:string):string => window.ts.transpile(tsCode);

export { TSCompileService }