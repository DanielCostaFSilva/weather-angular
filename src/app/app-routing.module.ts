import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { DetalhesCidadeComponent } from './detalhes-cidade/detalhes-cidade.component';


const routes: Routes = [
  { path: '', component: PaginaInicialComponent },
  { path: 'detalhes/:cidade', component: DetalhesCidadeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
