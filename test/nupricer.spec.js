'use strict';

describe("init", function() {
    var nupricer;

    beforeEach(function() {
        nupricer = require('../lib/nupricer.js');
    });

    it("nupricer is an object", function() {
        expect(typeof nupricer === 'object').toBe(true);
    });

    it("nupricer.calculate takes three arguments and returns a string", function() {
        expect(nupricer.calculate.length === 3).toBe(true);
        expect(typeof nupricer.calculate('$1299.99', '3 people', 'food') === 'string').toBe(true);
    });

});
