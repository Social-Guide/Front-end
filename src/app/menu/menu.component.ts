import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  nome = environment.nome
  sobrenome = environment.sobrenome
  foto = environment.foto
  id = environment.id

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  sair(){
    this.router.navigate(['/inicio'])
    environment.token = ''
    environment.nome = ''
    environment.sobrenome = ''
    environment.foto = ''
    environment.id = 0
  }

  toggleDarkTheme(){
    document.body.classList.toggle('dark-theme')
    document.body.classList.toggle('bg-secundary')
    document.getElementById('btn-theme')?.classList.toggle('dark-theme')
    document.getElementById('ball')?.classList.toggle('dark-theme')
  }
}

