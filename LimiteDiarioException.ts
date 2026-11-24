
export class LimiteDiarioException extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = "LimiteDiarioException";
    }
}
