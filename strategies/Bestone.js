var _ = require('lodash');
var tulind = require('tulind');
var log = require('../core/log.js');

var config = require('../core/util.js').getConfig();
var async = require('async');

var method = {};

method.init = function () {

    this.name = 'Bestone';
    this.trend = {
        direction: 'none',
        duration: 0,
        persisted: false,
        adviced: false
    };
    this.requiredHistory = config.tradingAdvisor.historySize;

    let customMACDSettings = this.settings.customMACDSettings,
        customEMAshortSettings = this.settings.customEMAshortSettings,
        customEMAlongSettings = this.settings.customEMAlongSettings,
        customRSISettings = this.settings.customRSISettings,
        customSTOCHSettings = this.settings.customSTOCHSettings;

        console.log(this.settings);

    this.addTulipIndicator('myMACD', 'macd', customMACDSettings);
    this.addTulipIndicator('myEMAshort', 'ema', customEMAshortSettings);
    this.addTulipIndicator('myEMAlong', 'ema', customEMAlongSettings);
    this.addTulipIndicator('myRSI', 'rsi', customRSISettings);
    this.addTulipIndicator('mySTOCH', 'stoch', customSTOCHSettings);
}

// What happens on every new candle?
method.update = function (candle) {
}

// For debugging purposes: log the last calculated
// EMAs and diff.
method.log = function () {
    //log.info (new Date().toLocaleString());
    //log.info ('calculated TULIND properties for candle:');
}

method.check = function (candle) {
    if (candle.close.length < this.requiredHistory) {
        return;
    }

    var macd = this.tulipIndicators.myMACD.result.macd;
    var rsi = this.tulipIndicators.myRSI.result.result;
    var emashort = this.tulipIndicators.myEMAshort.result.result;
    var emalong = this.tulipIndicators.myEMAlong.result.result;
    var stochK = this.tulipIndicators.mySTOCH.result.stochK;
    var stochD = this.tulipIndicators.mySTOCH.result.stochD;
    //    log.info('\t', "macd format:",  tulind.indicators.macd);

    /*
        log.info('\t', "macd:",  macd);
        log.info('\t', "rsi:",  rsi);
        log.info('\t', "stochK:", stochK);
        log.info('\t', "stochD:", stochD);
        log.info('\t', "emashort:", emashort);
        log.info('\t', "emalong:", emalong);
    */
    if (emashort > emalong && stochK > stochD && macd > 0.0 && rsi > this.settings.RSIhigh) {

        // New trend detected
        if (this.trend.direction !== 'up')
            // Reset the state for the new trend
            this.trend = {
                duration: 0,
                persisted: false,
                direction: 'up',
                adviced: false
            };

        this.trend.duration++;

        // log.debug('In uptrend since', this.trend.duration, 'candle (s)');

        if (this.trend.duration >= 1) this.trend.persisted = true;

        if (this.trend.persisted && !this.trend.adviced) {
            this.trend.adviced = true;
            this.advice('long');
        } else this.advice();

    } else if (emashort < emalong && stochK < stochD && macd < 0.0 && rsi < this.settings.RSIlow) {

        // New trend detected
        if (this.trend.direction !== 'down')
            // Reset the state for the new trend
            this.trend = {
                duration: 0,
                persisted: false,
                direction: 'down',
                adviced: false
            };

        this.trend.duration++;

        // log.debug('In downtrend since', this.trend.duration, 'candle (s)');

        if (this.trend.duration >= 1) this.trend.persisted = true;

        if (this.trend.persisted && !this.trend.adviced) {
            this.trend.adviced = true;
            this.advice('short');
        } else this.advice();

    } else {

        // log.debug('In no trend');
        this.advice();
    }
}
module.exports = method;
