import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; // Adicionamos o Router aqui
import { PessoaService } from '../../services/pessoa-service';

@Component({
  selector: 'app-consulta',
  imports: [RouterLink],
  templateUrl: './consulta.html',
  styleUrl: './consulta.css',
})
export class Consulta {

  // Injetamos o Router no construtor
  constructor(
    private pessoaService: PessoaService,
    private router: Router
  ) {}

  listar() {
    return this.pessoaService.listar();
  }

  excluir(id: any) {
    if (confirm('Tem certeza que deseja excluir esta pessoa?')) {
      this.pessoaService.excluirPessoa(id);
    }
  }

  editar(pessoa: any) {
    // 1. Manda a pessoa pro serviço guardar
    this.pessoaService.prepararEdicao(pessoa);
    // 2. Navega automaticamente para a tela de cadastro
    this.router.navigate(['/cadastro']);
  }
}
