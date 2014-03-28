'use strict';

var nupricer = require('../lib/nupricer'),
    helpers = require('../lib/helpers');

describe("calculations", function() {
    var inputPrices = ['$12', 'CAD200', '10000', '5112.12', '0'];
    var inputWorkers = ['12 workers', '100', '0', '564', 'People: 10'];

    it("Without exception, there is a flat markup on all jobs of 5%", function() {
        for(var i=0; i < inputPrices.length; ++i) {
            var inputPrice = inputPrices[i],
                inputPriceFloat = helpers.getPriceFloat(inputPrice),
                outputPriceFloat = nupricer.calculateFloat(inputPrice, '3 people', 'food');

            expect(outputPriceFloat).not.toBeLessThan(inputPriceFloat * 1.05);
        }
    });

    it("For each person that needs to work on the job, there is a markup of 1.2%", function() {
        for(var i=0; i < inputWorkers.length; ++i) {
            var inputPrice = "$1000",
                inputPriceFloat = helpers.getPriceFloat(inputPrice),
                inputWorker = inputWorkers[i],
                inputWorkerInt = helpers.getWorkersInt(inputWorker),
                workerSurcharge = (inputWorkerInt * 1.2) / 100,
                outputPriceFloat = nupricer.calculateFloat(inputPrice, inputWorker, 'food'),
                flatMarkUp = inputPriceFloat * 1.05;

            expect(outputPriceFloat).not.toBeLessThan(flatMarkUp + (flatMarkUp * workerSurcharge));
        }
    });

    it("If pharmaceuticals are involved, there is an immediate 7.5% markup", function() {
        var outputPriceFloat = nupricer.calculateFloat("$1000", "0", "drugs"),
            flatMarkUp = 1000 * 1.05;
        expect(outputPriceFloat).not.toBeLessThan(flatMarkUp +  (flatMarkUp * 0.075));
    });

    it("For food, there is a 13% markup", function() {
        var outputPriceFloat = nupricer.calculateFloat("$1000", "0", "food"),
            flatMarkUp = 1000 * 1.05;
        expect(outputPriceFloat).not.toBeLessThan(flatMarkUp + (flatMarkUp * 0.13));
    });

    it("Electronics require a 2% markup", function() {
        var outputPriceFloat = nupricer.calculateFloat("$1000", "0", "electronics"),
            flatMarkUp = 1000 * 1.05;
        expect(outputPriceFloat).not.toBeLessThan(flatMarkUp + (flatMarkUp * 0.02));
    });

    it("Everything else, there is no markup", function() {
        var outputPriceFloat = nupricer.calculateFloat("$1000", "0", "books"),
            flatMarkUp = 1000 * 1.05;
        expect(outputPriceFloat).not.toBeGreaterThan(flatMarkUp);
    });

    it("Example 1: $1299.99, 3 people, food", function() {
        var output = nupricer.calculate("$1299.99", "3 people", "food");
        expect(output).toBe("$1591.58");
    });

    it("Example 2: $5432.00, 1 person, drugs", function() {
        var output = nupricer.calculate("$5432.00", "1 person", "drugs");
        expect(output).toBe("$6199.81");
    });

    it("Example 3: $12456.95, 4 people, books", function() {
        var output = nupricer.calculate("$12456.95", "4 people", "books");
        expect(output).toBe("$13707.63");
    });

});
