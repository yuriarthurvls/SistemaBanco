
export class ValorInvalidoException extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = "ValorInvalidoException";
    }
}
