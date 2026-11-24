
export class ContaBloqueadaException extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = "ContaBloqueadaException";
    }
}
