const randomExt = require('random-ext');

const config = {
  stratName: 'RSI-GA', // stratName: 'RSI-GA',
  gekkoConfig: {
    watch: {
      exchange: 'poloniex',
      currency: 'USDT',
      asset: 'BTC'
    },

    daterange: 'scan',

    daterange: {
      from: '2017-02-18 04:02',
      to: '2018-02-18 04:00'
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
  parallelqueries: 5,

  // profit || score 
  // score = profit * sharpe -- feedback?
  // profit = recommended!
  mainObjective: 'profit',

  // optionally recieve and archive new all time high every new all time high
  // notifications: {
  //   email: {
  //     enabled: true,
  //     receiver: 'receiver@some.com',
  //     senderservice: 'gmail',
  //     sender: 'sender@gmail.com',
  //     senderpass: 'password',
  //   },
  // },
  candleValues: [5,10,15,30,60,120],
  getProperties: () => ({
    // Strat settings must be flattened and cannot be nested for mutation to work properly!
    historySize : randomExt.integer(40,10),
    low : randomExt.integer(30,5),
    high : randomExt.integer(95,70),
    interval : randomExt.integer(3,1),
    persistence : randomExt.integer(3,1),

    candleSize: config.candleValues[randomExt.integer(config.candleValues.length -1, 0)]

  })
};

module.exports = config;
