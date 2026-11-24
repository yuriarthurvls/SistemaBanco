
import { Cliente } from "./Cliente";
import { Notificacao } from "./Notificacao";

export class Aplicativo implements Notificacao {
    public enviar(cliente: Cliente, mensagem: string): void {
        console.log(`NOTIFICAÇÃO NO APP para ${cliente.getNome()}: ${mensagem}`);
    }
}
