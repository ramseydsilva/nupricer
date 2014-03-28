'use strict';

(function(errors) {

    var InvalidPriceError = function(message) {
        this.name = "InvalidPriceError";
        this.message = (message || "Invalid Price Format");
    }
    InvalidPriceError.prototype = Error.prototype;
    errors.InvalidPriceError = InvalidPriceError;

    var InvalidWorkersError = function(message) {
        this.name = "InvalidWorkersError";
        this.message = (message || "Invalid Workers Format");
    }
    InvalidWorkersError.prototype = Error.prototype;
    errors.InvalidWorkersError = Error.prototype;

}(exports));
