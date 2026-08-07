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
  //Função pra editar produtos
  indiceEdicao: number = -1

  adicionarProduto() {
    //  Criamos o pacotinho com os valores que estão na tela
    const novoProduto: Produto = {
      nome: this.nomeDigitado,
      valor: this.valorDigitado
    };

    // . O famoso "Caminho Duplo"
    if (this.indiceEdicao === -1) {
      // SE a memória for -1, é um produto NOVO!
      // Usamos o seu código original para colocar no fim da lista:
      this.produtos.push(novoProduto); 
      
    } else {
      // Se a memória tem um número, estamos editando. Substitui na posição correta.
      this.produtos[this.indiceEdicao] = novoProduto
 }

    //  Limpamos a casa no final de tudo
    this.nomeDigitado = '';
    this.valorDigitado = 0;
    this.indiceEdicao = -1; // <-- Muito importante: zeramos a memória para a próxima vez!
  }

  editarProduto(index: number) {
    this.nomeDigitado = this.produtos[index].nome
    this.valorDigitado = this.produtos[index].valor
    this.indiceEdicao = index;
  }

  excluirProduto(index: number){
    this.produtos.splice(index, 1);

  }
}
