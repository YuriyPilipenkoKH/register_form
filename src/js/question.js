//https://regform-a2556-default-rtdb.europe-west1.firebasedatabase.

import { refs } from "./refs";


export class  Question {
    static create(question) {
      return  fetch('https://regform-a2556-default-rtdb.europe-west1.firebasedatabase.app/questions.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            }
        } )
        .then(response => response.json())
        .then(response => {
            console.log(response);
            question.id = response.name
            return question
        })
        .then(addToLocalStorage)
        .then(Question.renderList)
    }

    static fetch(token) {
       return fetch(`https://regform-a2556-default-rtdb.europe-west1.firebasedatabase.app/questions.json?auth=${token}`)
        .then(response => response.json())
        .then(questions => {
            console.log(questions);
        })
    }

    static renderList() {
        const questionList = getQuestionsFromLocalStorage()

        const html = questionList.length
        ?  questionList.map(toCard).join(' ')
        :  ` <div class="mui--text-headline">There no questions so far</div>`

        refs.list.innerHTML = html
    }
}

function addToLocalStorage (question) {
    const all = getQuestionsFromLocalStorage()
    all.push(question)
    localStorage.setItem('questions', JSON.stringify(all))
}

function getQuestionsFromLocalStorage () {
    return JSON.parse(localStorage.getItem('questions', ) || '[]') 

}

function toCard(question) {
    return `
    <div class="mui--text-black-54">
    ${new Date(question.date).toLocaleDateString()}
    ${new Date(question.date).toLocaleTimeString()}
    </div>
    <div>${question.text}</div>
    <br>
    `
}