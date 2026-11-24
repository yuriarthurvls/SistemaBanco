
import { Cliente } from "./Cliente";
import { Notificacao } from "./Notificacao";

export class Email implements Notificacao {
    public enviar(cliente: Cliente, mensagem: string): void {
        console.log(`E-MAIL para ${cliente.getNome()}: ${mensagem}`);
    }
}
