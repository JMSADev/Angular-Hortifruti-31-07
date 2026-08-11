import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private pessoas: any[] = [];

  // Variável para segurar os dados temporariamente entre as telas
  pessoaEmEdicao: any = null;

  prepararEdicao(pessoa: any) {
    this.pessoaEmEdicao = pessoa;
  }

  // Essa função agora é inteligente: serve tanto para Adicionar quanto para Editar
  salvarPessoa(pessoa: any) {
    // Procura se a pessoa já existe na lista pelo ID
    const index = this.pessoas.findIndex(p => p.idPessoa === pessoa.idPessoa);

    if (index !== -1) {
      // Se achou, atualiza os dados na mesma posição
      this.pessoas[index] = pessoa;
    } else {
      // Se não achou (index -1), é cadastro novo, então empurra pra lista
      this.pessoas.push(pessoa);
    }
  }

  gerarId() {
    return this.pessoas.length;
  }

  listar() {
    return this.pessoas;
  }

  excluirPessoa(id: number) {
    this.pessoas = this.pessoas.filter(pessoa => pessoa.idPessoa !== id);
  }
}
