import './css/styles.css'
import { isValid } from './utils/utils'

const form = document.getElementById('form')
const input = document.getElementById('q')
const submitBtn = document.querySelector('.mui-btn')

form.addEventListener('submit', submitFormHandler)
input.addEventListener('input', inputHandler)
// submitBtn.disabled = true

function inputHandler ( ) {
    submitBtn.disabled = !isValid(input.value)
}

function submitFormHandler(e) {
  e.preventDefault()

  if(isValid(input.value)) {
  
    const question = {
        text: input.value.trim(),
        date: new Date().toJSON()
    }

    console.log(question);
    input.value = ''
    input.className = ''
    submitBtn.disabled = false
  }
}