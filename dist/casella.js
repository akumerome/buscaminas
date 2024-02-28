//tauler metode inicialitzar tauler
// inicializarCaselles(): Un mètode per inicialitzar les cèl·lules del tablero, incloent la distribució aleatòria de mines. es un metode privat
//generas un número aleatorio del 0 al 9.
var Casella = /** @class */ (function () {
    function Casella(esMina) {
        this.esMina = esMina;
        this.revelada = false;
        this.marcada = false;
    }
    return Casella;
}());
