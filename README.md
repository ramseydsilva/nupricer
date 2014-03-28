Nupricer
========

Pricing JS library

## Usage

Assuming you have npm installed, In the root of your JS project

```
npm install git://github.com/ramseydsilva/nupricer.git

```

Then in your code you can call the library like
```
var nupricer = require('nupricer');

nupricer.calculate("$1000", "0", "books");  // Returns $1591.58
nupricer.calculate("$1299.99", "3 people", "food");  // Returns $6199.81
nupricer.calculate("$5432.00", "1 person", "drugs");  // Returns $13707.63
```

## Tests

```
cd node_modules/nupricer
npm test
> jasmine-node test/

................

Finished in 0.013 seconds
16 tests, 61 assertions, 0 failures, 0 skipped
```

## Issues

Add any issues here: https://github.com/ramseydsilva/nupricer/issues

