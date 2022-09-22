import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TemaService } from '../service/tema.service';
import { Tema } from '../model/Tema';
import { Postagem } from '../model/Postagem';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { User } from '../model/User';
import { cardDarkTheme, toggleDarkTheme } from 'src/darkTheme';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  key = 'data'
  reverse = true

  nome = environment.nome
  sobrenome = environment.sobrenome
  foto = environment.foto
  id = environment.id
  usuario = environment.usuario

  tema: Tema = new Tema()
  postagem: Postagem = new Postagem()
  user: User = new User()

  listaTemas: Tema[]
  listaPostagem: Postagem[]

  idTema: number

  idUser = environment.id
  theme: boolean


  constructor(
    private router: Router,
    private temaService: TemaService,
    private postagemService: PostagemService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.router.navigate(['/inicio'])
    }

    this.findAllTemas()
    this.getAllTemas()
    this.getAllPostagens()
    this.checktheme()
    // this.idTema = this.route.snapshot.params['id']
    if(document.body.classList.contains('dark-theme')){
      cardDarkTheme()
    }

  }
  checktheme(){
    this.theme = document.body.classList.contains('dark-theme')
    return this.theme
  }

  findAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  cadastrar() {
    this.temaService.postTema(this.tema).subscribe({
      next: (resp: Tema) => {
        this.tema = resp
        alert('Tema cadastrado com sucesso!')
        this.tema = new Tema()
        this.findAllTemas()
      },
      error: (erro) => {
        if (erro.status == 400) {
          alert('Tema não pode ser cadastrado pois já existe um tema com está descrição');
        }
      },
    })

  }

  getAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema(id: number) {
    this.temaService.getByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  apagar() {
    this.temaService.deleteTema(this.tema.id).subscribe(() => {
      alert('Tema apagado com sucesso')
      this.getAllTemas()
    })
  }

  clickLike(postagem: number, like: boolean) {
    if (like != undefined && like) {
      this.removerLike(postagem)
    } else {
      this.adicionarLike(postagem)
    }
  }

  adicionarLike(postagem: number) {
    this.postagemService.adicionarLike(postagem).subscribe(() => {
      this.getAllPostagens();
    });
  }

  removerLike(postagem: number) {
    this.postagemService.removerLike(postagem).subscribe(() => {
      this.getAllPostagens();
    })
  }

  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagem = resp
      this.listaPostagem.forEach(function (value) {
        value.like.forEach(function (value2) {
          if (value2.usuario === environment.id) {
            value.user_liked = true
          }
        })
      });
    })
  }

  findByIdUser() {
    this.authService.getByIdUser(this.idUser).subscribe((resp: User) => {
      this.user = resp
    })
  }

  atualizar() {
    this.temaService.putTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp
      alert('Tema atualizado com sucesso')
      this.getAllTemas()
    })

  }

  publicar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user
    this.postagem.qtd_like = 0

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp

      alert('Postagem realizada com sucesso')

      this.postagem = new Postagem()
      this.getAllPostagens()
      
    }, erro => {
      if(erro.status == 500){
        const titulo = (document.querySelector("#titulo") as HTMLInputElement);
        const texto = (document.querySelector("#texto") as HTMLInputElement);
        const tema = (document.querySelector("#tema") as HTMLInputElement);
        if(titulo.value == ""){
          alert("Não foi possível concluir a postagem. Título não pode ser nulo")
        }
        else if(titulo.value.length < 5 ){
          alert("Não foi possível concluir a postagem. Verifique se seu título tem mais de 5 caracteres.")
        }
        else if(texto.value == ""){
          alert('Não foi possível concluir a postagem. Texto não pode ser nulo')
        }
        else if(texto.value.length > 255){
          alert('Não foi possível concluir a postagem. Verifique se seu texto tem menos de 255 caracteres.')
        }
        else if(tema.value == ""){
          alert('Não foi possível concluir a postagem. Selecione um tema')
        }
      }
    })
  }

  clearTema() {
    this.tema = new Tema()
  }
  wordCounter(){
    if (this.postagem == null){
      return 0
    }
    else if (this.postagem.texto == null){
      return 0
    }
    
    return this.postagem.texto.length
  }
}
