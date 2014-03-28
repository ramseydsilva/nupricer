'use strict';

var errors = require('./errors');

(function(helpers) {

    helpers.getPriceInt = function(price) {
        return price.match(/\d*\.?\d*$/g)[0];
    }

    helpers.getCurrency = function(price) {
        return price.match(/^\D{0,}/g)[0];
    }

    helpers.checkPriceFormat = function(price) {
        var currency = this.getCurrency(price);
        var priceInt = this.getPriceInt(price);
        if (typeof currency != 'string' || isNaN(parseFloat(priceInt)) || !isFinite(priceInt) || priceInt == '') {
            throw (errors.InvalidPriceError);
        }
        return true;
    };

    helpers.checkWorkersFormat = function(workers) {
        var match = workers.match(/\d+/g);
        if (!match || match.length > 1) {
            throw (errors.InvalidWorkersError);
        }
    };

})(exports);
