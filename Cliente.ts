
import { Conta } from "./Conta";
import { Notificacao } from "./Notificacao";

export class Cliente {
    private contas: Conta[] = [];

    constructor(
        private nome: string,
        private cpf: string,
        private endereco: string,
        private renda: number,
        private notificacao: Notificacao
    ) {}

    public adicionarConta(conta: Conta): void {
        this.contas.push(conta);
    }

    public enviarNotificacao(mensagem: string): void {
        this.notificacao.enviar(this, mensagem);
    }

    public trocarNotificacao(notificacao: Notificacao): void {
        this.notificacao = notificacao;
    }

    public getNome(): string {
        return this.nome;
    }

    public getCpf(): string {
        return this.cpf;
    }

    public getContas(): Conta[] {
        return this.contas;
    }
}
