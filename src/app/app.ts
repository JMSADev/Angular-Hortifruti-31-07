import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Cadastro } from './componentes/cadastro/cadastro';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('CrudPessoas');
}
