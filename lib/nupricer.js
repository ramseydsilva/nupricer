/*
 * nupricer
 * https://github.com/ramseydsilva/nupricer
 *
 * Copyright (c) 2014 Ramsey D'silva
 * Licensed under the MIT license.
 */

'use strict';

var helpers = require('./helpers');

(function(nupricer) {

    /**
     * Gets price as string, with currency
     */
    nupricer.calculate = function(price, workers, material) {
        helpers.checkPriceFormat(price);  // Check proper price format
        helpers.checkWorkersFormat(workers);  // Check proper workers format

        var baseCurrency = helpers.getCurrency(price);
        var outputPriceFloat = helpers.getPriceFloat(price);

        return baseCurrency + outputPriceFloat;
    };

    /**
     * Gets price as Float, without currency
     */
    nupricer.calculateFloat = function(price, workers, material) {
        return helpers.getPriceFloat(this.calculate(price, workers, material));
    };

}(exports));
