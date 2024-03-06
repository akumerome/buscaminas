var Tauler = /** @class */ (function () {
    function Tauler(files, columnes) {
        this.files = files;
        this.columnes = columnes;
        this.inicialitzarTaulell();
    }
    Tauler.prototype.getCaselles = function () {
        return this.caselles;
    };
    Tauler.prototype.inicialitzarTaulell = function () {
        this.crearTaulell();
        this.inicialitzarCaselles();
    };
    Tauler.prototype.crearTaulell = function () {
        // Initialize caselles as a bidimensional array
        this.caselles = new Array(this.files);
        for (var i = 0; i < this.files; i++) {
            this.caselles[i] = new Array(this.columnes);
        }
    };
    Tauler.prototype.inicialitzarCaselles = function () {
        // Initialize individual casella objects within the array
        for (var i = 0; i < this.files; i++) {
            for (var j = 0; j < this.columnes; j++) {
                this.caselles[i][j] = new Casella(this.collocarMina());
            }
        }
    };
    Tauler.prototype.collocarMina = function () {
        var isMina = false;
        var number = Math.random();
        if (number < 0.15) {
            isMina = true;
        }
        return isMina;
    };
    Tauler.prototype.imprimirTauler = function () {
        console.log(this.caselles);
    };
    return Tauler;
}());
