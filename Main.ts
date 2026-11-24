
import { Banco } from "./Banco";
import { Cliente } from "./Cliente";
import { Conta } from "./Conta";

import { SMS } from "./SMS";
import { Email } from "./Email";
import { Aplicativo } from "./Aplicativo";

import { ValorInvalidoException } from "./ValorInvalidoException";
import { ContaBloqueadaException } from "./ContaBloqueadaException";
import { SaldoInsuficienteException } from "./SaldoInsuficienteException";
import { LimiteDiarioException } from "./LimiteDiarioException";

const banco = new Banco("Cooperativa Digital");

const sms = new SMS();
const email = new Email();
const aplicativo = new Aplicativo();

// Cadastro dos clientes
const cliente1 = new Cliente(
    "João Silva", "11111111111",
    "Rua A", 2500, sms
);

const cliente2 = new Cliente(
    "Maria Souza", "22222222222",
    "Rua B", 3500, email
);

const cliente3 = new Cliente(
    "Pedro Santos", "33333333333",
    "Rua C", 4000, aplicativo
);

banco.cadastrarCliente(cliente1);
banco.cadastrarCliente(cliente2);
banco.cadastrarCliente(cliente3);

// Criação das contas
const conta1 = new Conta(
    "001", "100", new Date(), 1000, 500, cliente1
);

const conta2 = new Conta(
    "002", "100", new Date(), 1000, 500, cliente2
);

const conta3 = new Conta(
    "003", "200", new Date(), 1000, 500, cliente3
);

const conta4 = new Conta(
    "004", "200", new Date(), 1000, 500, cliente1
);

const conta5 = new Conta(
    "005", "300", new Date(), 1000, 200, cliente2
);

const conta6 = new Conta(
    "006", "300", new Date(), 1000, 200, cliente3
);

const conta7 = new Conta(
    "007", "400", new Date(), 1000, 500, cliente1
);

const conta8 = new Conta(
    "008", "400", new Date(), 1000, 500, cliente2
);

// Função para testar operações e capturar exceções
function testarOperacao(
    descricao: string,
    operacao: () => void
): void {
    console.log(`\n${descricao}`);

    try {
        operacao();
    } catch (erro) {
        if (erro instanceof ValorInvalidoException ||
            erro instanceof ContaBloqueadaException ||
            erro instanceof SaldoInsuficienteException ||
            erro instanceof LimiteDiarioException) {

            console.log(`${erro.name}: ${erro.message}`);
        } else {
            console.log("Erro inesperado:", erro);
        }
    }
}

// TESTE 1: VALOR INVÁLIDO
console.log("\n========== VALOR INVÁLIDO ==========");

testarOperacao("Exemplo 1: saque negativo", () => {
    conta1.sacar(-50);
});

testarOperacao("Exemplo 2: saque igual a zero", () => {
    conta1.sacar(0);
});

// TESTE 2: CONTA BLOQUEADA
console.log("\n========== CONTA BLOQUEADA ==========");

conta2.bloquearConta();

testarOperacao("Exemplo 1: saque em conta bloqueada", () => {
    conta2.sacar(100);
});

testarOperacao("Exemplo 2: outro saque em conta bloqueada", () => {
    conta2.sacar(200);
});

// TESTE 3: SALDO INSUFICIENTE
console.log("\n========== SALDO INSUFICIENTE ==========");

testarOperacao("Exemplo 1: tentativa de sacar R$ 1.500", () => {
    conta3.sacar(1500);
});

testarOperacao("Exemplo 2: tentativa de sacar R$ 1.200", () => {
    conta3.sacar(1200);
});

// TESTE 4: LIMITE DIÁRIO EXCEDIDO
console.log("\n========== LIMITE DIÁRIO ==========");

testarOperacao("Exemplo 1: saque acima do limite", () => {
    conta5.sacar(250);
});

testarOperacao("Exemplo 2: outro saque acima do limite", () => {
    conta6.sacar(300);
});

// TESTE 5: SAQUES PERMITIDOS
console.log("\n========== SAQUES REALIZADOS ==========");

testarOperacao("Exemplo 1: saque de R$ 200", () => {
    conta7.sacar(200);
});

testarOperacao("Exemplo 2: saque de R$ 300", () => {
    conta8.sacar(300);
});

// TESTE 6: DEPÓSITOS
console.log("\n========== DEPÓSITOS ==========");

testarOperacao("Depósito de R$ 500", () => {
    conta7.depositar(500);
});

// TESTE 7: CONSULTA DE SALDO
console.log("\n========== CONSULTA DE SALDO ==========");

console.log(`Saldo da conta 7: R$ ${conta7.consultarSaldo().toFixed(2)}`);
console.log(`Saldo da conta 8: R$ ${conta8.consultarSaldo().toFixed(2)}`);

// TESTE 8: MOVIMENTAÇÕES
console.log("\n========== MOVIMENTAÇÕES ==========");

conta7.listarMovimentacoes();

// TESTE 9: TROCA DE NOTIFICAÇÃO
console.log("\n========== TROCA DE NOTIFICAÇÃO ==========");

cliente1.trocarNotificacao(aplicativo);

testarOperacao("Notificação pelo aplicativo", () => {
    conta1.sacar(-10);
});

// LISTAGEM FINAL
console.log("\n========== CLIENTES CADASTRADOS ==========");

banco.listarClientes();
