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
        if(!token) {
            return Promise.resolve('<p class ="error">No token</p>')
        }
       return fetch(`https://regform-a2556-default-rtdb.europe-west1.firebasedatabase.app/questions.json?auth=${token}`)
        .then(response => response.json())
        .then(response => {
            if(response && response.error){
                return `<p>${response.error}</p>`
            }
            return response 
            ?  Object.keys(response).map(key => ({
                ...response[key],
                id: key,
                 }))
            :  []
        })
    }

    static renderList() {
        const questionList = getQuestionsFromLocalStorage()

        const html = questionList.length
        ?  questionList.map(toCard).join(' ')
        :  ` <div class="mui--text-headline">There no questions so far</div>`

        refs.list.innerHTML = html
    }

    static listToHTML(questions) {
        return questions.length
                ?  `<ol>${questions.map(q => `<li>${q.text}</li>`.join('') )}</ol>`
                : ` <p>No Questions so far</p>`
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