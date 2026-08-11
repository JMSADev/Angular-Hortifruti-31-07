import { Routes } from '@angular/router';
import { Cadastro } from './componentes/cadastro/cadastro';
import { Consulta } from './componentes/consulta/consulta';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'cadastro',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: Cadastro
    },
    {
        path: 'consulta',
        component: Consulta
    },
    {
        path: 'cadastro',
        component: Cadastro
    },
];
