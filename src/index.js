import './css/styles.css'
import { refs } from './js/refs'
import { Question } from './js/question'
import { isValid, createModal } from './utils/utils'
import { getAuthFormHTML } from './js/auth'


const input = refs.input

window.addEventListener('load', Question.renderList)
refs.form.addEventListener('submit', submitFormHandler)
input.addEventListener('input', inputHandler)
refs.modalOpenBtn.addEventListener('click', openModal)
// 

function inputHandler ( ) {
    refs.submitBtn.disabled = !isValid(input.value)
}

function submitFormHandler(e) {
  e.preventDefault()

  if(isValid(input.value)) {
  
    const question = {
        text: input.value.trim(),
        date: new Date().toJSON()
    }
    refs.submitBtn.disabled = true

    Question.create(question)
    .then( () => {
        console.log(question);
     
        input.value = ''
        input.className = ''
        refs.submitBtn.disabled = false
    })

  
  }
}

function openModal() {
    createModal('Authorization', getAuthFormHTML())
    refs.authForm.addEventListener('submit', authFormHandler, {once: true})
}

function authFormHandler(e) {
    e.preventDefault()
}