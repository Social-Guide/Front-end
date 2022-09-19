export function toggleDarkTheme(){
    document.body.classList.toggle('dark-theme')
    document.body.classList.toggle('bg-secundary')
    document.getElementById('btn-theme')?.classList.toggle('dark-theme')
    document.getElementById('ball')?.classList.toggle('dark-theme')
    cardDarkTheme()
  }

  export function cardDarkTheme(){
    var elements = document.getElementsByClassName('card')
    for(var i =0; i< elements.length; i++){
      elements[i].classList.toggle('dark-theme')
    }
  }