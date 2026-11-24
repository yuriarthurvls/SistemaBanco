
export class Movimentacao {
    private data: Date;

    constructor(
        private tipo: string,
        private valor: number
    ) {
        this.data = new Date();
    }

    public exibir(): string {
        return `${this.tipo} - R$ ${this.valor.toFixed(2)} - ${this.data.toLocaleString("pt-BR")}`;
    }
}
