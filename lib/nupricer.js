/*
 * nupricer
 * https://github.com/ramseydsilva/nupricer
 *
 * Copyright (c) 2014 Ramsey D'silva
 * Licensed under the MIT license.
 */

'use strict';

var errors = require('./errors'),
    helpers = require('./helpers');

(function(nupricer) {
    var basePrice,
        basePriceInt,
        baseCurrency,
        outputPriceInt;

    nupricer.calculate = function(price, workers, material) {
        helpers.checkPriceFormat(price);
        helpers.checkWorkersFormat(workers);
        baseCurrency = helpers.getCurrency(price);
        outputPriceInt = helpers.getPriceInt(price);
        return baseCurrency + outputPriceInt;
    };

}(exports));
