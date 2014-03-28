'use strict';

var errors = require('./errors');

(function(helpers) {

    /**
     * Strips away currency and returns price as String
     */
    helpers.getPriceStr = function(price) {
        return price.match(/\d*\.?\d*$/g)[0];
    };

    /**
     * Returns price as Float
     */
    helpers.getPriceFloat = function(price) {
        return parseFloat(this.getPriceStr(price));
    };

    /**
     * Strips price and returns currency as String
     */
    helpers.getCurrency = function(price) {
        return price.match(/^\D{0,}/g)[0];
    };

    /**
     * Strips text and returns workers as Int
     */
    helpers.getWorkersInt = function(workers) {
        return parseInt(workers.match(/\d+/g)[0]);
    };

    /**
     * Checks for valid price format else throws error
     */
    helpers.checkPriceFormat = function(price) {
        var currency = this.getCurrency(price);
        var priceStr = this.getPriceStr(price);
        if (typeof currency !== 'string' || isNaN(parseFloat(priceStr)) || !isFinite(priceStr) || priceStr === '') {
            throw (errors.InvalidPriceError);
        }
        return true;
    };

    /**
     * Checks for valid worker format else throws error
     */
    helpers.checkWorkersFormat = function(workers) {
        var match = workers.match(/\d+/g);
        if (!match || match.length > 1) {
            throw (errors.InvalidWorkersError);
        }
    };

})(exports);
