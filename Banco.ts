
import { Cliente } from "./Cliente";

export class Banco {
    private clientes: Cliente[] = [];

    constructor(private nome: string) {}

    public cadastrarCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
        console.log(`Cliente ${cliente.getNome()} cadastrado.`);
    }

    public listarClientes(): void {
        console.log(`\nClientes da instituição ${this.nome}:`);

        this.clientes.forEach((cliente) => {
            console.log(`Nome: ${cliente.getNome()}`);
            console.log(`CPF: ${cliente.getCpf()}`);
            console.log(`Quantidade de contas: ${cliente.getContas().length}`);
            console.log("--------------------------");
        });
    }
}
