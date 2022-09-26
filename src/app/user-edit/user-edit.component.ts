import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';
import { Comentario } from '../model/Comentario';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User()
  idUser: number
  confirmarSenha: string
  tipoUsuario: string
  theme: boolean

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  atualizar() {
    this.user.tipo = this.tipoUsuario

    if (this.user.senha != this.confirmarSenha) {
      alert("Senhas incorretas!")
    }
    else
      this.authService.atualizarUser(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(["/feed"])
        alert("Usuário atualizado com sucesso, faça o login novamente!")
        environment.token = ''
        environment.nome = ''
        environment.sobrenome = ''
        environment.foto = ''
        environment.id = 0
        this.router.navigate(['/entrar'])
      })
      var comentario = new Comentario()
      comentario.usuario = new User()
      comentario.foto = this.user.foto
      comentario.nome = this.user.nome + ' ' + this.user.sobrenome
      comentario.usuario.id = this.user.id
      this.authService.atualizarUserComentario(comentario).subscribe(() =>{})
  }

  findByIdUser(id: number) {
    this.authService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp
    })
  }

  checktheme(){
    this.theme = document.body.classList.contains('dark-theme')
    return this.theme
  }

}
