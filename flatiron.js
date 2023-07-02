
document.addEventListener('DOMContentLoaded', ()=>{
    screenWidth = screen.width.toString()
    let div = document.querySelector('div')
    div.style.width = screenWidth+'px'
  })
  
  
  function displayContent(films){
        let main = document.querySelector('main')
        main.innerHTML = `
        <img id='${films.id}'src='${films.poster}'>
        <p id='items'>Available tickets : ${films.capacity - films.tickets_sold}<br>
        screentime :${films.showtime}<br>
        Duration: ${films.runtime}<br>
        <button id='button'>Buy Ticket</button>
        <button id='delete'>DELETE</button>
        <h4>${films.description}</h4>
        </p>
        `
        let btn = main.querySelector('#button')
        btn.onclick = (event) => {
            event.preventDefault();
            if(films.capacity > 0){
            let remainingTickets = films.capacity  - 1
            let soldTickets = films.tickets_sold + 1
            let final = {tickets_sold : soldTickets}        
            
            fetch(`http://localhost:4000/films/${films.id}` , {
                method : 'PATCH',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(final)
            })
        }else{
            let soldOut = {
                capacity : 'SOLD OUT !'
            }
    
            fetch(`http://localhost:4000/films/${films.id}` , {
                method : 'PATCH',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(soldOut)
            })
        }
    }
        let deleteMovie = main.querySelector('#delete')
        deleteMovie.addEventListener('click' , deleteIt)
          
  
    function deleteIt(){
        fetch(`http://localhost:4000/films/${films.id}` , {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            },
        })
    }
    
  }
  
  fetch('http://localhost:4000/films/')
  .then((res) => res.json())
  .then((data) => displayNames(data))
  
  function displayNames(names){
    names.forEach(films => {
    let menu = document.querySelector('#list')
    let display =document.createElement('li')
    display.innerHTML = `
    <p>${films.title}</p>
    `
    menu.appendChild(display)
    display.onclick = () => {
        displayContent(films)
    }
  
  })
  }
  