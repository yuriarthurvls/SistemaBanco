
import { Cliente } from "./Cliente";
import { Notificacao } from "./Notificacao";

export class SMS implements Notificacao {
    public enviar(cliente: Cliente, mensagem: string): void {
        console.log(`SMS para ${cliente.getNome()}: ${mensagem}`);
    }
}
