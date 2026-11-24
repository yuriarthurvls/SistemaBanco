
export class SaldoInsuficienteException extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = "SaldoInsuficienteException";
    }
}
