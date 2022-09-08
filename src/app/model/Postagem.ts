import { Tema } from "./Tema"
import { User } from "./User"

export class Postagem{
    public id: number
    public titulo: string
    public texto: string
    public data: Date
    public parceiros_nome: string
    public parceiros_email: string
    public parceiros_site: string
    public usuario: User
    public tema: Tema
}