class Tauler {
    private caselles: Array<Array<Casella>>; // Array bidimensional de caselles
    private files: number;
    private columnes: number;

    public constructor(files: number, columnes: number) {
        this.files = files;
        this.columnes = columnes;
        this.inicialitzarTaulell();
    }

    public getCaselles(): Array<Array<Casella>> {
        return this.caselles;
    }

    public inicialitzarTaulell() {
        this.crearTaulell();
        this.inicialitzarCaselles();
    }

    public crearTaulell() {
        // Initialize caselles as a bidimensional array
        this.caselles = new Array(this.files);
        for (let i = 0; i < this.files; i++) {
            this.caselles[i] = new Array(this.columnes);
        }
    }

    public inicialitzarCaselles() {
        // Initialize individual casella objects within the array
        for (let i = 0; i < this.files; i++) {
            for (let j = 0; j < this.columnes; j++) {
                this.caselles[i][j] = new Casella(this.collocarMina());
            }
        }
    }

    public collocarMina(){
        let isMina : boolean = false
        const number : number = Math.random();

        if (number < 0.15) {
            isMina = true;
        }

        return isMina;
    }

    public imprimirTauler() {
        console.log(this.caselles);
    }
}