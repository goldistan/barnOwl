const randomExt = require('random-ext');

const config = {
  stratName: 'StochRSI-GA',
  gekkoConfig: {
    watch: {
      exchange: 'binance',
      currency: 'USDT',
      asset: 'BTC'
    },
    daterange: 'scan',
    daterange: {
      from: '2017-11-17 22:45',
      to: '2018-02-23 22:45'
    },

    simulationBalance: {
      'asset': 1,
      'currency': 1
    },

    slippage: 0.05,
    feeTaker: 0.25,
    feeMaker: 0.15,
    feeUsing: 'taker', // maker || taker

  },
  apiUrl: 'http://localhost:3000',
  // Population size, better reduce this for larger data
  populationAmt: 20,
  // How many completely new units will be added to the population (populationAmt * variation must be a whole number!!)
  variation: 0.5,
  // How many components maximum to mutate at once
  mutateElements: 7,
  // How many parallel queries to run at once
  parallelqueries: 10,

  mainObjective: 'profit',
  candleValues: [10,20,30],
  getProperties: () => ({
    // Strat settings must be flattened and cannot be nested for mutation to work properly!
    historySize : randomExt.integer(16,10),
    low : randomExt.integer(30,5),
    high : randomExt.integer(95,70),
    interval : randomExt.integer(14,7),
    persistence : randomExt.integer(6,1),
    candleSize: config.candleValues[randomExt.integer(config.candleValues.length -1, 0)]

  })
};

module.exports = config;