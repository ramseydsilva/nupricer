'use strict';

describe("init", function() {
    var nupricer;

    beforeEach(function() {
        nupricer = require('../lib/nupricer.js');
    });

    it("nupricer object loads", function() {
        expect(typeof nupricer === 'object').toBe(true);
    });
});
