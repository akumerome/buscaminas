class Joc {
    private tauler: Tauler;

    public constructor(tauler: Tauler) {
        this.tauler = tauler;
    }

    public dibuixarTauler() {

        const tableContainer = document.createElement('div');
        tableContainer.classList.add('contenidor-tauler');
        const tableElement = document.createElement('div');
        tableElement.classList.add('tauler');

        for (let i = 0; i < this.tauler.getCaselles().length; i++) {
            const row = document.createElement('div');
            row.classList.add('fila');

            for (let j = 0; j < this.tauler.getCaselles()[i].length; j++) {
                const cell = document.createElement('div');

                cell.classList.add('casella');
                cell.setAttribute('id', `c${i}-${j}`);

                const img = document.createElement('img');
                img.src="./img/square.gif";
                cell.appendChild(img);

                // Afegim click event listener per revelar casella
                cell.addEventListener('click', () => this.revelarCasella(i, j));

                // Si la casella no ha sigut encara revelada afegim right click event listener per marcar casella com a sospitosa
                if (!this.tauler.getCaselles()[i][j].getRevelada()) {
                    cell.addEventListener('contextmenu', (e) => this.marcarCasella(e, i, j));
                }

                // Si la casella ha sigut marcada afegim class per pintar-la com a marcada
                if (this.tauler.getCaselles()[i][j].getMarcada()) {
                    img.src="./img/flag.png";
                }

                if (this.tauler.getCaselles()[i][j].getRevelada()) {
                    if (this.tauler.getCaselles()[i][j].getEsMina()) {
                        img.src="./img/mina.png";
                    } else {
                        img.src=`./img/Minesweeper_${this.calcularMinesProperes(i, j)}.gif`;
                        this.comprovarVictoria();
                    }
                }

                row.appendChild(cell);
            }

            tableElement.appendChild(row);
        }


        tableContainer.appendChild(tableElement);
        document.body.appendChild(tableContainer);
    }

    private revelarCasella(fila: number, columna: number) {
        const casella = document.getElementById(`c${fila}-${columna}`);
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
                this.revelarTauler()
                setTimeout(() => {
                    alert("BOOOM! Has saltat pels aires!");
                }, 1000);
            }

            // Actualitzem la representació visual del tauler en l'interfície d'usuari
            this.eliminarTauler();
            this.dibuixarTauler();
        }
    }

    private revelarTauler() {
        for (const row of this.tauler.getCaselles()) {
            for (const casella of row) {
                casella.setRevelada(true);
            }
        }
    }

    private comprovarVictoria() {

        let esVictoria : boolean = true;

        for (const row of this.tauler.getCaselles()) {
            for (const casella of row) {
                if (!casella.getRevelada() && !casella.getEsMina()) {
                    esVictoria = false;
                }
            }
        }

        if (esVictoria) {
            this.revelarTauler()
            setTimeout(() => {
                alert("Has guanyat la partida!");
            }, 1000);
        }
        
    }

    private revelarCasellaSenseMina(fila: number, columna: number, cnt: number) {
        const caselles = this.tauler.getCaselles();
        const filesTotals = caselles.length;
        const columnesTotals = caselles[0].length;

        if (cnt > 0) {
            for (let i = fila - 1; i <= fila + 1; i++) {
                for (let j = columna - 1; j <= columna + 1; j++) {
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
    }

    private esZero(fila: number, columna: number) {
        const caselles = this.tauler.getCaselles();
        const filesTotals = caselles.length;
        const columnesTotals = caselles[0].length;

        let qtyMines = 0;
        for (let i = fila - 1; i <= fila + 1; i++) {
            for (let j = columna - 1; j <= columna + 1; j++) {
                if (i >= 0 && i < filesTotals && j >= 0 && j < columnesTotals) {
                    if (caselles[i][j].getEsMina()) {
                        qtyMines++;
                    }
                }
            }
        }

        return qtyMines == 0;
    }

    private marcarCasella(event: MouseEvent, fila: number, columna: number) {

        // Prevenim que al fer clic amb el botó dret del ratolí s'obri el menú desplegable
        event.preventDefault();

        // Si la casella no ha estat marcada com sospitosa es marca; si la casella ha estat marcada com sospitosa es desmarca
        if (!this.tauler.getCaselles()[fila][columna].getMarcada()) {
            this.tauler.getCaselles()[fila][columna].setMarcada(true);
        } else {
            this.tauler.getCaselles()[fila][columna].setMarcada(false);
        }

        this.eliminarTauler();
        this.dibuixarTauler();
    }

    private calcularMinesProperes(fila: number, columna: number) {
        const caselles = this.tauler.getCaselles();
        const filesTotals = caselles.length;
        const columnesTotals = caselles[0].length;

        let qtyMines = 0;
        for (let i = fila - 1; i <= fila + 1; i++) {
            for (let j = columna - 1; j <= columna + 1; j++) {
                if (i >= 0 && i < filesTotals && j >= 0 && j < columnesTotals) {
                    if (caselles[i][j].getEsMina()) {
                        qtyMines++;
                    }
                }
            }
        }

        return qtyMines;
    }

    private eliminarTauler() {
        const tauler = document.querySelector('.contenidor-tauler');
        if (tauler) {
            tauler.remove();
        }
    }
}