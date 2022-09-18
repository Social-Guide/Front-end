import { Like } from "./Like"
import { Tema } from "./Tema"
import { User } from "./User"

export class Postagem{
    public id: number
    public titulo: string
    public texto: string
    public data: Date
    public foto: string
    public parceiros_nome: string
    public parceiros_email: string
    public parceiros_site: string
    public usuario: User
    public tema: Tema
    public like: Like[]
    public qtd_like: number
    public user_liked: boolean
}
