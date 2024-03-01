var Joc = /** @class */ (function () {
    function Joc(tauler) {
        this.tauler = tauler;
    }
    Joc.prototype.dibuixarTauler = function () {
        var _this = this;
        var tableContainer = document.createElement('div');
        tableContainer.classList.add('contenidor-tauler');
        var tableElement = document.createElement('div');
        tableElement.classList.add('tauler');
        var _loop_1 = function (i) {
            var row = document.createElement('div');
            row.classList.add('fila');
            var _loop_2 = function (j) {
                var cell = document.createElement('div');
                cell.classList.add('casella');
                cell.setAttribute('id', "c".concat(i, "-").concat(j));
                var img = document.createElement('img');
                img.src = "./img/square.gif";
                cell.appendChild(img);
                // Afegim click event listener per revelar casella
                cell.addEventListener('click', function () { return _this.revelarCasella(i, j); });
                // Si la casella no ha sigut encara revelada afegim right click event listener per marcar casella com a sospitosa
                if (!this_1.tauler.getCaselles()[i][j].getRevelada()) {
                    cell.addEventListener('contextmenu', function (e) { return _this.marcarCasella(e, i, j); });
                }
                // Si la casella ha sigut marcada afegim class per pintar-la com a marcada
                if (this_1.tauler.getCaselles()[i][j].getMarcada()) {
                    img.src = "./img/flag.png";
                }
                if (this_1.tauler.getCaselles()[i][j].getRevelada()) {
                    if (this_1.tauler.getCaselles()[i][j].getEsMina()) {
                        img.src = "./img/mina.png";
                    }
                    else {
                        img.src = "./img/Minesweeper_".concat(this_1.calcularMinesProperes(i, j), ".gif");
                        this_1.comprovarVictoria();
                    }
                }
                row.appendChild(cell);
            };
            for (var j = 0; j < this_1.tauler.getCaselles()[i].length; j++) {
                _loop_2(j);
            }
            tableElement.appendChild(row);
        };
        var this_1 = this;
        for (var i = 0; i < this.tauler.getCaselles().length; i++) {
            _loop_1(i);
        }
        tableContainer.appendChild(tableElement);
        document.body.appendChild(tableContainer);
    };
    Joc.prototype.revelarCasella = function (fila, columna) {
        var casella = document.getElementById("c".concat(fila, "-").concat(columna));
        if (casella) {
            // Desmarquem la casella clicada com a casella sospitosa
            this.tauler.getCaselles()[fila][columna].setMarcada(false);
            casella.classList.remove("marcada");
            // Revelem la casella clicada
            this.tauler.getCaselles()[fila][columna].setRevelada(true);
            // Si la casella clicada no té cap bomba al voltant revelem de manera recursiva les caselles del voltant
            if (this.esZero(fila, columna)) {
                this.revelarCasellaSenseMina(fila, columna, 3);
            }
            if (this.tauler.getCaselles()[fila][columna].getEsMina()) {
                this.revelarTauler();
                setTimeout(function () {
                    alert("BOOOM! Has saltat pels aires!");
                }, 1000);
            }
            // Actualitzem la representació visual del tauler en l'interfície d'usuari
            this.eliminarTauler();
            this.dibuixarTauler();
        }
    };
    Joc.prototype.revelarTauler = function () {
        for (var _i = 0, _a = this.tauler.getCaselles(); _i < _a.length; _i++) {
            var row = _a[_i];
            for (var _b = 0, row_1 = row; _b < row_1.length; _b++) {
                var casella = row_1[_b];
                casella.setRevelada(true);
            }
        }
    };
    Joc.prototype.comprovarVictoria = function () {
        var esVictoria = true;
        for (var _i = 0, _a = this.tauler.getCaselles(); _i < _a.length; _i++) {
            var row = _a[_i];
            for (var _b = 0, row_2 = row; _b < row_2.length; _b++) {
                var casella = row_2[_b];
                if (!casella.getRevelada() && !casella.getEsMina()) {
                    esVictoria = false;
                }
            }
        }
        if (esVictoria) {
            this.revelarTauler();
            setTimeout(function () {
                alert("Has guanyat la partida!");
            }, 1000);
        }
    };
    Joc.prototype.revelarCasellaSenseMina = function (fila, columna, cnt) {
        var caselles = this.tauler.getCaselles();
        var filesTotals = caselles.length;
        var columnesTotals = caselles[0].length;
        if (cnt > 0) {
            for (var i = fila - 1; i <= fila + 1; i++) {
                for (var j = columna - 1; j <= columna + 1; j++) {
                    if (i >= 0 && i < filesTotals && j >= 0 && j < columnesTotals) {
                        if (!caselles[i][j].getEsMina() && !caselles[i][j].getRevelada()) {
                            caselles[i][j].setRevelada(true);
                            cnt--;
                            this.revelarCasellaSenseMina(i, j, cnt);
                        }
                    }
                }
            }
        }
    };
    Joc.prototype.esZero = function (fila, columna) {
        var caselles = this.tauler.getCaselles();
        var filesTotals = caselles.length;
        var columnesTotals = caselles[0].length;
        var qtyMines = 0;
        for (var i = fila - 1; i <= fila + 1; i++) {
            for (var j = columna - 1; j <= columna + 1; j++) {
                if (i >= 0 && i < filesTotals && j >= 0 && j < columnesTotals) {
                    if (caselles[i][j].getEsMina()) {
                        qtyMines++;
                    }
                }
            }
        }
        return qtyMines == 0;
    };
    Joc.prototype.marcarCasella = function (event, fila, columna) {
        // Prevenim que al fer clic amb el botó dret del ratolí s'obri el menú desplegable
        event.preventDefault();
        // Si la casella no ha estat marcada com sospitosa es marca; si la casella ha estat marcada com sospitosa es desmarca
        if (!this.tauler.getCaselles()[fila][columna].getMarcada()) {
            this.tauler.getCaselles()[fila][columna].setMarcada(true);
        }
        else {
            this.tauler.getCaselles()[fila][columna].setMarcada(false);
        }
        this.eliminarTauler();
        this.dibuixarTauler();
    };
    Joc.prototype.calcularMinesProperes = function (fila, columna) {
        var caselles = this.tauler.getCaselles();
        var filesTotals = caselles.length;
        var columnesTotals = caselles[0].length;
        var qtyMines = 0;
        for (var i = fila - 1; i <= fila + 1; i++) {
            for (var j = columna - 1; j <= columna + 1; j++) {
                if (i >= 0 && i < filesTotals && j >= 0 && j < columnesTotals) {
                    if (caselles[i][j].getEsMina()) {
                        qtyMines++;
                    }
                }
            }
        }
        return qtyMines;
    };
    Joc.prototype.eliminarTauler = function () {
        var tauler = document.querySelector('.contenidor-tauler');
        if (tauler) {
            tauler.remove();
        }
    };
    return Joc;
}());
