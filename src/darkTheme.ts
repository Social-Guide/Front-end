export function toggleDarkTheme(){
    document.body.classList.toggle('dark-theme')
    document.body.classList.toggle('bg-secundary')
    document.getElementById('btn-theme')?.classList.toggle('dark-theme')
    document.getElementById('ball')?.classList.toggle('dark-theme')
    document.getElementsByClassName('color-nav')[0]?.classList.toggle('dark-theme')
    var elements = document.getElementsByClassName('font-theme')
    for(var i = 0; i< elements.length; i++){
      elements[i].classList.toggle('dark-theme')
    }
    cardDarkTheme()
    modalTheme()
  }

  export function cardDarkTheme(){
    var elements = document.getElementsByClassName('card')
    for(var i =0; i< elements.length; i++){
      elements[i].classList.toggle('dark-theme')
    }
  }

  function modalTheme(){
    var elements = document.getElementsByClassName('modal-content')
    for(var i =0; i< elements.length; i++){
      elements[i].classList.toggle('dark-theme')
    }
}