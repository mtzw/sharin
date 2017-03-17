'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eras = require('../data/eras.json');

var _eras2 = _interopRequireDefault(_eras);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Wareki = function () {
    function Wareki() {
        _classCallCheck(this, Wareki);
    }

    _createClass(Wareki, [{
        key: 'getEra',
        value: function getEra(prefix) {
            if (prefix == undefined) {
                undefined;
            }
            return _eras2.default[prefix.toUpperCase()];
        }
    }, {
        key: 'getEraByYear',
        value: function getEraByYear(year) {
            if (year > '2018') {
                return this.getEra('N');
            } else if (year > '1988') {
                return this.getEra('H');
            } else if (year > '1925') {
                return this.getEra('S');
            } else if (year > '1911') {
                return this.getEra('T');
            } else if (year > '1867') {
                return this.getEra('M');
            } else {
                return undefined;
            }
        }
    }, {
        key: 'toWarekiYear',
        value: function toWarekiYear(year) {
            var era = this.getEraByYear(year);
            if (era == undefined) {
                return year;
            } else {
                var previousEraLastYear = Number(era['previousYear'].slice(0, 4)) - 1;
                return era['name'] + (year - previousEraLastYear);
            }
        }
    }, {
        key: 'isValidWareki',
        value: function isValidWareki(g, year, month, dayOfMonth) {
            var era = _eras2.default[g.toUpperCase()];
            if (era == undefined) return false;
            var fullyear = Number(era['previousYear']) + Number(year);
            var adjustedMonth = Number(month) - 1;
            var firstDay = era['firstDay'];
            var lastDay = era['lastDay'];
            var baseDay = Number(fullyear + Utils.pad(month, '00') + Utils.pad(dayOfMonth, '00'));
            if (lastDay != '' && (Number(firstDay) > baseDay || Number(lastDay) < baseDay)) {
                return false;
            }
            var date = new Date(fullyear, adjustedMonth, dayOfMonth);
            return date.getFullYear() == fullyear && date.getMonth() == adjustedMonth && date.getDate() == dayOfMonth;
        }
    }]);

    return Wareki;
}();

var Utils = function () {
    function Utils() {
        _classCallCheck(this, Utils);
    }

    _createClass(Utils, null, [{
        key: 'pad',
        value: function pad(str, pattern) {
            var len = pattern.length;
            return (pattern + str).slice(-len);
        }
    }]);

    return Utils;
}();

module.exports = Wareki;