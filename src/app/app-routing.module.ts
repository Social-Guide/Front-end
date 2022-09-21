import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { ConfiguracaoComponent } from './configuracao/configuracao.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { EntrarComponent } from './entrar/entrar.component';
import { FeedComponent } from './feed/feed.component';
import { InicioComponent } from './inicio/inicio.component';
import { MeuPerfilComponent } from './meu-perfil/meu-perfil.component';
import { TemaComponent } from './tema/tema.component';
import { PostagemEditComponent } from './edit/postagem-edit/postagem-edit.component';

const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {path: 'entrar', component: EntrarComponent },
  {path: 'cadastrar', component: CadastrarComponent },
  {path: 'inicio', component: InicioComponent },
  {path: 'tema', component: TemaComponent},
  {path: 'feed', component: FeedComponent},
  {path: 'user-edit/:id', component: UserEditComponent},
  {path: 'configuracao', component: ConfiguracaoComponent},
  {path: 'meu-perfil/:id', component: MeuPerfilComponent},
  {path: 'postagem-edit/:id', component: PostagemEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
