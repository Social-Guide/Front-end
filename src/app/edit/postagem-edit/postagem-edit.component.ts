import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: Postagem = new Postagem()
  tema: Tema = new Tema()
  user: User = new User()

  id = environment.id
  listaTemas: Tema[]
  idTema: number
  idUser = environment.id

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      // alert('Sua sessão expirou! Faça login novamente!')
      this.router.navigate(['/entrar'])
    }

    let id = this.route.snapshot.params['id']
    this.findByIdPostagem(id)
    this.findAllTemas()
  }

  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  findAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdUser() {
    this.authService.getByIdUser(this.idUser).subscribe((resp: User) => {
      this.user = resp
    })
  }

  atualizar() {
    if (this.idTema == null) {
      const element = document.querySelector("#tema");
      if (element != null) {
        element.insertAdjacentHTML('afterend', '<p class="text-danger font-weight-bold mt-2 mb-2">Tema é obrigatório</p>');
      }
    }
    else {
      this.tema = new Tema()
      this.user = new User()
      this.user.id = this.postagem.usuario.id
      this.postagem.usuario = this.user
      this.tema.id = this.idTema
      this.postagem.tema = this.tema

      this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem) => {
        this.postagem = resp
        alert('Postagem atualizada com sucesso!')
        this.router.navigate(['/meu-perfil/0'])
      })
    }
  }
}