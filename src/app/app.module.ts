import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { EntrarComponent } from './entrar/entrar.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './inicio/inicio.component';
import { TemaComponent } from './tema/tema.component';
import { FormsModule } from '@angular/forms';
import { FeedComponent } from './feed/feed.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ConfiguracaoComponent } from './configuracao/configuracao.component';
import { MeuPerfilComponent } from './meu-perfil/meu-perfil.component';
import { OrderModule } from 'ngx-order-pipe';
import { toggleDarkTheme } from 'src/darkTheme';
import { PostagemEditComponent } from './edit/postagem-edit/postagem-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RodapeComponent,
    EntrarComponent,
    CadastrarComponent,
    InicioComponent,
    TemaComponent,
    FeedComponent,
    UserEditComponent,
    ConfiguracaoComponent,
    MeuPerfilComponent,
    PostagemEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    OrderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
