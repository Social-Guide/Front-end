import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comentario } from '../model/Comentario';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllPostagens(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(`${environment.url}/postagens`, this.token)
  }

  getByIdPostagem(id: number): Observable<Postagem>{
    return this.http.get<Postagem>(`${environment.url}/postagens/${id}`, this.token)
  }

  postPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.post<Postagem>(`${environment.url}/postagens`, postagem, this.token)
  }

  putPostagem(postagem: Postagem): Observable<Postagem>{
    return this.http.put<Postagem>(`${environment.url}/postagens`, postagem, this.token)
  }

  deletePostagem(id: number){
    return this.http.delete(`${environment.url}/postagens/${id}`, this.token)
  }

  adicionarLike(postagem: number){
    return this.http.post(`${environment.url}/postagens/like/${postagem}/${environment.id}`, this.token)
  }

  removerLike(postagem: number){
    return this.http.delete(`${environment.url}/postagens/like/${postagem}/${environment.id}`, this.token)
  }

  postComentario(comentario: Comentario): Observable<Comentario>{
    return this.http.post<Comentario>(`${environment.url}/postagens/comentarios/`, comentario, this.token)
  }

  getComentario(id:number): Observable<Comentario>{
    return this.http.get<Comentario>(`${environment.url}/postagens/comentarios/${id}`,this.token)
  }

  deleteComentario(id: number){
    return this.http.delete(`${environment.url}/postagens/comentarios/${id}`, this.token)
  }
}