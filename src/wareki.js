import eras_json from '../data/eras.json';

class Wareki {

    constructor() {}

    getEra(prefix) {
        if (prefix == undefined) { 
            undefined;
        }
        return eras_json[prefix.toUpperCase()];
    }

    getEraByYear(year) {
        if (year > '2018') {
            return this.getEra('N');
        } else if (year > '1988'){
            return this.getEra('H');
        } else if (year > '1925'){
            return this.getEra('S');
        } else if (year > '1911'){
            return this.getEra('T');
        } else if (year > '1867'){
            return this.getEra('M');
        } else {
            return undefined;
        }
    }

    toWarekiYear(year) {
        let era = this.getEraByYear(year);
        if (era == undefined) {
            return year;
        } else {
            let previousEraLastYear = Number(era['previousYear'].slice(0, 4)) - 1;
            return era['name'] + (year - previousEraLastYear);
        }
    }

    isValidWareki(g, year, month, dayOfMonth) {
        let era = eras_json[g.toUpperCase()];
        if (era == undefined) return false;
        let fullyear = Number(era['previousYear']) + Number(year);
        let adjustedMonth = Number(month) - 1;
        let firstDay = era['firstDay'];
        let lastDay = era['lastDay'];
        let baseDay = Number(fullyear + Utils.pad(month, '00') + Utils.pad(dayOfMonth, '00'));
        if (lastDay != '' && (Number(firstDay) > baseDay || Number(lastDay) < baseDay)) {
            return false;
        }
        let date = new Date(fullyear, adjustedMonth, dayOfMonth);
        return (date.getFullYear() == fullyear && date.getMonth() == adjustedMonth && date.getDate() == dayOfMonth);
    }    
}

class Utils {
    static pad(str, pattern) {
        let len = pattern.length;
        return (pattern+str).slice(-len);
    }
}

module.exports = Wareki;