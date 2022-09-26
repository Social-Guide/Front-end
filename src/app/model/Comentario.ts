import { Postagem } from "./Postagem"
import { User } from "./User"

export class Comentario {
    public id: number
    public postagem: Postagem
    public usuario: User
    public comentarios: string
    public nome: string
    public foto: string
}
