
import { Cliente } from "./Cliente";
import { Movimentacao } from "./Movimentacao";
import { ValorInvalidoException } from "./ValorInvalidoException";
import { ContaBloqueadaException } from "./ContaBloqueadaException";
import { SaldoInsuficienteException } from "./SaldoInsuficienteException";
import { LimiteDiarioException } from "./LimiteDiarioException";

export class Conta {
    private bloqueada: boolean = false;
    private totalSacadoHoje: number = 0;
    private dataControle: string = new Date().toDateString();
    private movimentacoes: Movimentacao[] = [];

    constructor(
        private numero: string,
        private agencia: string,
        private dataAbertura: Date,
        private saldo: number,
        private limiteDiario: number,
        private cliente: Cliente
    ) {
        cliente.adicionarConta(this);
    }

    private atualizarDia(): void {
        const hoje = new Date().toDateString();

        if (this.dataControle !== hoje) {
            this.totalSacadoHoje = 0;
            this.dataControle = hoje;
        }
    }

    public sacar(valor: number): void {
        this.atualizarDia();

        if (!Number.isFinite(valor) || valor <= 0) {
            const mensagem = "Valor inválido para saque.";
            this.cliente.enviarNotificacao(mensagem);
            throw new ValorInvalidoException(mensagem);
        }

        if (this.bloqueada) {
            const mensagem = "Conta bloqueada. Procure o atendimento.";
            this.cliente.enviarNotificacao(mensagem);
            throw new ContaBloqueadaException(mensagem);
        }

        if (valor > this.saldo) {
            const falta = valor - this.saldo;

            const mensagem =
                `Saldo insuficiente. Faltam R$ ${falta.toFixed(2)}.`;

            this.cliente.enviarNotificacao(mensagem);
            throw new SaldoInsuficienteException(mensagem);
        }

        if (this.totalSacadoHoje + valor > this.limiteDiario) {
            const mensagem = "Limite diário de saque excedido.";
            this.cliente.enviarNotificacao(mensagem);
            throw new LimiteDiarioException(mensagem);
        }

        this.saldo -= valor;
        this.totalSacadoHoje += valor;

        this.movimentacoes.push(new Movimentacao("SAQUE", valor));

        console.log("Saque realizado com sucesso!");
        console.log(`Valor: R$ ${valor.toFixed(2)}`);
        console.log(`Saldo atual: R$ ${this.saldo.toFixed(2)}`);
    }

    public depositar(valor: number): void {
        if (!Number.isFinite(valor) || valor <= 0) {
            const mensagem = "Valor inválido para depósito.";
            this.cliente.enviarNotificacao(mensagem);
            throw new ValorInvalidoException(mensagem);
        }

        if (this.bloqueada) {
            const mensagem = "Conta bloqueada. Depósito não permitido.";
            this.cliente.enviarNotificacao(mensagem);
            throw new ContaBloqueadaException(mensagem);
        }

        this.saldo += valor;

        this.movimentacoes.push(new Movimentacao("DEPÓSITO", valor));

        console.log("Depósito realizado com sucesso!");
        console.log(`Saldo atual: R$ ${this.saldo.toFixed(2)}`);
    }

    public consultarSaldo(): number {
        return this.saldo;
    }

    public bloquearConta(): void {
        this.bloqueada = true;
        console.log(`Conta ${this.numero} bloqueada.`);
    }

    public desbloquearConta(): void {
        this.bloqueada = false;
        console.log(`Conta ${this.numero} desbloqueada.`);
    }

    public listarMovimentacoes(): void {
        console.log(`Movimentações da conta ${this.numero}:`);

        this.movimentacoes.forEach((movimentacao) => {
            console.log(movimentacao.exibir());
        });
    }

    public getNumero(): string {
        return this.numero;
    }

    public getAgencia(): string {
        return this.agencia;
    }

    public getCliente(): Cliente {
        return this.cliente;
    }
}
