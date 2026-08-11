import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PessoaService } from '../../services/pessoa-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro implements OnInit {
  // Adicionamos o idPessoa para saber se estamos editando alguém (0 = Novo)
  idPessoa = 0;
  nome = '';
  email = '';
  cpf = 0.0;
  bday = '';
  uf = '';
  municipio = '';

  estados: any[] = [];
  cidades: any[] = [];

  constructor(private pessoaService: PessoaService) { }

  ngOnInit() {
    this.carregarEstados();

    // Quando a tela abre, verifica se o serviço mandou alguém pra editar
    const pessoaEdit = this.pessoaService.pessoaEmEdicao;

    if (pessoaEdit) {
      // Se mandou, preenchemos os inputs com os dados dela
      this.idPessoa = pessoaEdit.idPessoa;
      this.nome = pessoaEdit.nome;
      this.email = pessoaEdit.email;
      this.cpf = pessoaEdit.cpf;
      this.bday = pessoaEdit.bday;
      this.uf = pessoaEdit.uf;
      this.municipio = pessoaEdit.municipio;

      // Como o estado (uf) já veio preenchido, carregamos as cidades dele
      if (this.uf) {
        this.carregarCidades(false); // Passa false para não apagar o município atual
      }

      // Limpamos o serviço para não travar no modo de edição para sempre
      this.pessoaService.pessoaEmEdicao = null;
    }
  }

  carregarEstados() {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .then(resposta => resposta.json())
      .then(dados => this.estados = dados);
  }

  // Adicionamos o "limparMunicipio" para ele não apagar a cidade quando estivermos apenas carregando a edição
  carregarCidades(limparMunicipio = true) {
    if (limparMunicipio) {
      this.municipio = '';
    }
    this.cidades = [];

    if (this.uf) {
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${this.uf}/municipios?orderBy=nome`)
        .then(resposta => resposta.json())
        .then(dados => this.cidades = dados);
    }
  }

  save() {
    // Se for 0, gera um ID novo. Se for maior que 0, usa o ID da pessoa que estamos editando.
    let idParaSalvar = this.idPessoa === 0 ? this.pessoaService.gerarId() + 1 : this.idPessoa;

    // Trocamos o addPessoa pelo novo salvarPessoa que criamos
    this.pessoaService.salvarPessoa({
      idPessoa: idParaSalvar,
      nome: this.nome,
      email: this.email,
      cpf: this.cpf,
      bday: this.bday,
      uf: this.uf,
      municipio: this.municipio
    });

    // Limpa a tela toda e volta para o modo "Cadastro Novo"
    this.idPessoa = 0;
    this.nome = '';
    this.email = '';
    this.cpf = 0.0;
    this.bday = '';
    this.uf = '';
    this.municipio = '';
    this.cidades = [];

    alert('Dados salvos com sucesso!');
  }
}
