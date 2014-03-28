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
     * Gets price as Float, without currency
     */
    nupricer.calculateFloat = function(price, workers, material) {
        var initialPriceFloat, flatMarkUp, withWorkers, materialSurcharge, withMaterials, outputPriceFloat;

        helpers.checkPriceFormat(price);  // Check proper price format
        helpers.checkWorkersFormat(workers);  // Check proper workers format

        var initialPriceFloat = helpers.getPriceFloat(price);
        var flatMarkUp = initialPriceFloat * 1.05;
        var withWorkers = flatMarkUp + (flatMarkUp * helpers.getWorkersInt(workers) * 0.012);
        var materialSurcharge;

        switch(material) {
            case "drugs":
                materialSurcharge = 0.075;
                break;
            case "food":
                materialSurcharge = 0.13;
                break;
            case "electronics":
                materialSurcharge = 0.02;
                break;
            default:
                materialSurcharge = 0;
        }

        var withMaterials = withWorkers + (flatMarkUp * materialSurcharge);
        var outputPriceFloat = withMaterials;

        return Math.round(outputPriceFloat*100) / 100;
    };

    /**
     * Gets price as String, with currency
     */
    nupricer.calculate = function(price, workers, material) {
        var baseCurrency = helpers.getCurrency(price);
        return baseCurrency + this.calculateFloat(price, workers, material);
    };

}(exports));
