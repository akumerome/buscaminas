class Casella {
    private esMina: boolean;
    private revelada: boolean;
    private marcada: boolean;
    
    public constructor(esMina: boolean) {
        this.esMina = esMina;
        this.revelada = false;
        this.marcada = false;
    }

    public getEsMina(): boolean {
        return this.esMina;
    }

    public getRevelada(): boolean {
        return this.revelada;
    }

    public setRevelada(revelada : boolean) {
        this.revelada = revelada;
    }

    public getMarcada(): boolean {
        return this.marcada;
    }

    public setMarcada(marcada : boolean) {
        this.marcada = marcada;
    }
}