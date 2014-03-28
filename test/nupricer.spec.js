'use strict';


describe("init", function() {
    var nupricer, errors;

    beforeEach(function() {
        nupricer = require('../lib/nupricer.js');
        errors = require('../lib/errors');
    });

    it("nupricer is an object that ships calculate function", function() {
        expect(typeof nupricer === 'object').toBe(true);
        expect(typeof nupricer.calculate === 'function').toBe(true);
    });

    it("calculate takes three arguments and returns a string", function() {
        expect(nupricer.calculate.length === 3).toBe(true);
        expect(typeof nupricer.calculate('$1299.99', '3 people', 'food') === 'string').toBe(true);
    });

    it("calculate takes valid Price", function() {
        var invalidPrices = ['awef', '$aaefaw', '0000a', '$', 'CAD'];
        var validPrices = ['$12', 'CAD12', '12', '12.12', 'USD12.12'];

        for(var i=0; i < invalidPrices.length; ++i) {
            expect(function() {
                nupricer.calculate(invalidPrices[i], '3 people', 'food');
            }).toThrow(new errors.InvalidPriceError);
        }

        for(var i=0; i < validPrices.length; ++i) {
            expect(function() {
                nupricer.calculate(validPrices[i], '3 people', 'food');
            }).not.toThrow(new errors.InvalidPriceError);
        }
    });

    it("calculate takes valid number of Workers", function() {
        var validWorkers = ['1', '1 person', '1person', '0', '2 people', '2 good workers'];
        var invalidWorkers = ['many workers', 'no workers', '', '12.12'];

        for(var i=0; i < invalidWorkers.length; ++i) {
            expect(function() {
                nupricer.calculate('$12', invalidWorkers[i],  'food');
            }).toThrow(errors.InvalidWorkersError);
        }

        for(var i=0; i < validWorkers.length; ++i) {
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
