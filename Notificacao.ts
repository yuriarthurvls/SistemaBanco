
import { Cliente } from "./Cliente";

export interface Notificacao {
    enviar(cliente: Cliente, mensagem: string): void;
}
