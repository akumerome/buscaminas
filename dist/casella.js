var Casella = /** @class */ (function () {
    function Casella(esMina) {
        this.esMina = esMina;
        this.revelada = false;
        this.marcada = false;
    }
    Casella.prototype.getEsMina = function () {
        return this.esMina;
    };
    Casella.prototype.getRevelada = function () {
        return this.revelada;
    };
    Casella.prototype.setRevelada = function (revelada) {
        this.revelada = revelada;
    };
    Casella.prototype.getMarcada = function () {
        return this.marcada;
    };
    Casella.prototype.setMarcada = function (marcada) {
        this.marcada = marcada;
    };
    return Casella;
}());
