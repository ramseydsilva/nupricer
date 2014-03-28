'use strict';

var nupricer = require('../lib/nupricer'),
    helpers = require('../lib/helpers'),
    errors = require('../lib/errors');

describe("init", function() {
    var validPrices = ['$12', 'CAD12', '12', '12.12', 'USD12.12'];

    it("nupricer is an object that ships calculate function", function() {
        expect(typeof nupricer === 'object').toBe(true);
        expect(typeof nupricer.calculate === 'function').toBe(true);
    });

    it("calculate takes three arguments and returns a string", function() {
        expect(nupricer.calculate.length === 3).toBe(true);
        expect(typeof nupricer.calculate('$1299.99', '3 people', 'food') === 'string').toBe(true);
    });

    it("calculate outputs the price with input currency", function() {
        expect(nupricer.calculate('$12', '1', 'food')).toContain('$');
        expect(nupricer.calculate('CAD12', '1', 'food')).toContain('CAD');
        expect(nupricer.calculate('12', '1', 'food')).not.toContain('$');
        expect(nupricer.calculate('12', '1', 'food')).not.toContain('CAD');
    });

    it("calculate outputs valid price", function() {
        for(var i=0; i < validPrices.length; ++i) {
            expect(helpers.checkPriceFormat(nupricer.calculate(validPrices[i], '3 people', 'food'))).toBe(true);
        }
    });

    it("calculate takes valid price", function() {
        var invalidPrices = ['awef', '$aaefaw', '0000a', '$', 'CAD'];

        for(var i=0; i < invalidPrices.length; ++i) {
            expect(function() {
                nupricer.calculate(invalidPrices[i], '3 people', 'food');
            }).toThrow(errors.InvalidPriceError);
        }

        for(i=0; i < validPrices.length; ++i) {
            expect(function() {
                nupricer.calculate(validPrices[i], '3 people', 'food');
            }).not.toThrow(errors.InvalidPriceError);
        }
    });

    it("calculate takes valid number of workers", function() {
        var validWorkers = ['1', '1 person', '1person', '0', '2 people', '2 good workers', 'workers: 100 people', '-2'];
        var invalidWorkers = ['many workers', 'none', '', '12.12', '12 workers or 20', '12 20'];

        for(var i=0; i < invalidWorkers.length; ++i) {
            expect(function() {
                nupricer.calculate('$12', invalidWorkers[i],  'food');
            }).toThrow(errors.InvalidWorkersError);
        }

        for(i=0; i < validWorkers.length; ++i) {
            expect(function() {
                nupricer.calculate('$12', validWorkers[i], 'food');
            }).not.toThrow(errors.InvalidWorkersError);
        }

    });

    it("calculate takes valid material", function() {
        var validMaterials = ['', '1', 1, 'food', 'drugs', 'any thing', undefined];

        for(var i=0; i < validMaterials.length; ++i) {
            expect(function() {
                nupricer.calculate('$12', '5 people',  validMaterials[i]);
            }).not.toThrow();
        }

    });
});
