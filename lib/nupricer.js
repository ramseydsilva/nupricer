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
        var baseCurrency, initialPriceFloat, flatMarkUp, withWorkers, materialSurcharge, withMaterials, outputPriceFloat;

        helpers.checkPriceFormat(price);  // Check proper price format
        helpers.checkWorkersFormat(workers);  // Check proper workers format

        var baseCurrency = helpers.getCurrency(price);
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

        return baseCurrency + ( Math.round(outputPriceFloat*100) / 100 );
    };

    /**
     * Gets price as Float, without currency
     */
    nupricer.calculateFloat = function(price, workers, material) {
        return helpers.getPriceFloat(this.calculate(price, workers, material));
    };

}(exports));
