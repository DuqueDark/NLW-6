import Modal from './modal.js'

const modal = Modal()

//Pegar todos os botões que conteim a tecla check
const checkButtons = document.querySelectorAll(".actions a.check")

checkButtons.forEach( button => {
    //add Listener
    button.addEventListener("click", handleClick)
})

const deleteButton = document.querySelectorAll(".actions a.delete")

deleteButton.forEach(button => {
    button.addEventListener("click", event => handleClick(event, false))
})

const modalTitle = document.querySelector('.modal h2')
const modalDesc = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

function handleClick( event, check = true ){
    event.preventDefault()

    const questionId = event.target.dataset.id
    const roomId = document.querySelector("#room-id").dataset.id
    const slug = check ? "check" : "delete"

    const form = document.querySelector(".modal form")
    form.setAttribute("action",`/question/${roomId}/${questionId}/${slug}`)

    const text = check ? "Marcar como lida" : "Excluir"

    modalTitle.innerHTML = `${text} esta pergunta?`
    modalDesc.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?` 
    modalButton.innerHTML = `Sim, ${text}`
    check ? modalButton.classList.remove('red') : modalButton.classList.add('red')

    //abrir modal
    modal.open()
}