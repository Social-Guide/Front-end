import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { TemaService } from '../service/tema.service';
import { Tema } from '../model/Tema';
import { Postagem } from '../model/Postagem';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { User } from '../model/User';

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

  constructor(
    private router: Router,
    private temaService: TemaService,
    private postagemService: PostagemService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if (environment.token == '') {
      this.router.navigate(['/inicio'])
    }

    this.findAllTemas()
    this.getAllTemas()
    this.getAllPostagens()
    this.idTema = this.route.snapshot.params['id']

  }

  findAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  cadastrar(){
    this.temaService.postTema(this.tema).subscribe({
      next: (resp:Tema) =>{
      this.tema = resp
      alert('Tema cadastrado com sucesso!')
      this.tema = new Tema()
      this.findAllTemas()
      },
      error: (erro) => {
        if(erro.status == 400){
          alert('Tema não pode ser cadastrado pois já existe um tema com está descrição');
        }
      },
    })

  }

  getAllTemas(){
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  

  findByIdTema(id:number){
    this.temaService.getByIdTema(id).subscribe((resp: Tema) =>{
      this.tema = resp
    })
  }

  apagar (){
    this.temaService.deleteTema(this.tema.id).subscribe(()=>{
      alert('Tema apagado com sucesso')
      this.getAllTemas()
    })
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) =>{
      this.listaPostagem = resp
    })
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: User) => {
      this.user = resp
    })
  }

  atualizar() {
    this.temaService.putTema(this.tema).subscribe((resp: Tema)=> {
     this.tema = resp
     alert('Tema atualizado com sucesso')
     this.getAllTemas()
    })
   
   }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp

      alert('Postagem realizada com sucesso')

      this.postagem = new Postagem()
      this.getAllPostagens()
    })
  }

  clearTema(){
    this.tema = new Tema()
  }

