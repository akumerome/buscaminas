class Joc {
    private tauler: Tauler;

    public constructor(tauler: Tauler) {
        this.tauler = tauler;
    }

    public dibuixarTauler() {
        //console.log(this.tauler);

        const tableContainer = document.createElement('div');
        const tableElement = document.createElement('table');

        tableElement.classList.add('tauler');

        for (let i = 0; i < this.tauler.caselles.length; i++) {
            const row = document.createElement('tr');

            for (let j = 0; j < this.tauler.caselles[i].length; j++) {
                const cell = document.createElement('td');

                cell.classList.add('casella');

                cell.textContent = this.tauler.caselles[i][j].toString(); // Assuming the array contains values to display
                row.appendChild(cell);
            }

            tableElement.appendChild(row);
        }

        tableContainer.appendChild(tableElement);
        document.body.appendChild(tableContainer);
    }
}