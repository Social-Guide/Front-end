import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cardDarkTheme } from 'src/darkTheme';
import { environment } from 'src/environments/environment';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.css']
})
export class MeuPerfilComponent implements OnInit {

  idUser = environment.id

  key = 'data'
  reverse = true

  postagem: Postagem = new Postagem()
  user: User = new User()

  listaPostagem: Postagem[]
  listaTemas: Tema[]
  theme: boolean

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(){
    window.scroll(0,0)

    if(environment.token == ''){
      // alert('Sua sessão expirou, faça o login novamente')
      this.router.navigate(['/inicio'])
    }
    if(document.body.classList.contains('dark-theme')){
      cardDarkTheme()
    }
    this.theme = document.body.classList.contains('dark-theme')

    this.findByIdUser()
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: User) => {
      this.user = resp
    })
  }
}
