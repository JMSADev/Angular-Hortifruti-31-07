import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

interface Produto {
  nome: string;
  valor: number;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  //lista que vai guardar todos os produtos
  produtos: Produto[] = [];
  //Variáveis para conectar com os campos do html
  nomeDigitado: string = '';
  valorDigitado: number = 0;

  adicionarProduto() {
    //Cria um novo produto com valores digitados
    const novoProduto: Produto = {
      nome: this.nomeDigitado,
      valor: this.valorDigitado
    };

    //Coloca o produto na lista
    this.produtos.push(novoProduto);

    //Limpa os campos da tela
    this.nomeDigitado = '';
    this.valorDigitado = 0;
  }
}
