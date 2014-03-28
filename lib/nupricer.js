/*
 * nupricer
 * https://github.com/ramseydsilva/nupricer
 *
 * Copyright (c) 2014 Ramsey D'silva
 * Licensed under the MIT license.
 */

'use strict';

var errors = require('./errors');

(function(nupricer) {

    nupricer.checkPriceFormat = function(price) {
        var currency = price.match(/^\D{0,}/g)[0];
        var priceInt = price.match(/\d*\.?\d*$/g)[0];
        if (typeof currency != 'string' || isNaN(parseFloat(priceInt)) || !isFinite(priceInt) || priceInt == '') {
            throw (errors.InvalidPriceError);
        }
        return;
    };

    var checkWorkersFormat = function(workers) {
        var match = workers.match(/\d+/g);
        if (!match || match.length > 1) {
            throw (errors.InvalidWorkersError);
        }
    };

    nupricer.calculate = function(price, workers, material) {
        this.checkPriceFormat(price);
        checkWorkersFormat(workers);
        return "string";
    };

}(exports));
