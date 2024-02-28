var Joc = /** @class */ (function () {
    function Joc(tauler) {
        this.tauler = tauler;
    }
    Joc.prototype.dibuixarTauler = function () {
        //console.log(this.tauler);
        var tableContainer = document.createElement('div');
        var tableElement = document.createElement('table');
        tableElement.classList.add('tauler');
        for (var i = 0; i < this.tauler.caselles.length; i++) {
            var row = document.createElement('tr');
            for (var j = 0; j < this.tauler.caselles[i].length; j++) {
                var cell = document.createElement('td');
                cell.classList.add('casella');
                cell.textContent = this.tauler.caselles[i][j].toString(); // Assuming the array contains values to display
                row.appendChild(cell);
            }
            tableElement.appendChild(row);
        }
        tableContainer.appendChild(tableElement);
        document.body.appendChild(tableContainer);
    };
    return Joc;
}());
