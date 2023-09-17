// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js'

import {
  getDatabase,
  ref,
  get,
  set,
  child,
  update,
  remove
} from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyALV3U-w7Ds8tMrzrZZZz9XJ50hYI6XAUM',
  authDomain: 'petshop-impacta-ae693.firebaseapp.com',
  databaseURL: 'https://petshop-impacta-ae693-default-rtdb.firebaseio.com',
  projectId: 'petshop-impacta-ae693',
  storageBucket: 'petshop-impacta-ae693.appspot.com',
  messagingSenderId: '186447942464',
  appId: '1:186447942464:web:c54645ad0f1c4f0ddb60a5'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

// referencias
const name = document.querySelector('#input-name')
const date = document.querySelector('#input-date')
const time = document.querySelector('#input-time')
const btnService = document.querySelectorAll('input[name="services"]')
let selectedService
const btnTypeService = document.querySelectorAll('input[name="type-services"]')
let selectedTypeService
const btnConfirm = document.querySelector('#btn-confirm')

const messageService = document.querySelector('#type-service')
const messageDate = document.querySelector('#day-choosed')
const messageTime = document.querySelector('#time-choosed')

const section1 = document.querySelector('#section-1')
const section2 = document.querySelector('#section-2')

btnService.forEach(element => {
  element.addEventListener('click', function () {
    element.classList.add('.checked')
    selectedService = element
  })
})

btnTypeService.forEach(element =>{
  element.addEventListener('click', function(){
    element.classList.add('.checked')
    selectedTypeService = element
  })
})


function insertData() {
  // Verifique se os campos obrigatórios foram preenchidos corretamente
  set(ref(db, 'agendamentos/' + date.value), {
    nameClient: name.value,
    dateChoosed: date.value,
    timeChoosed: time.value,
    serviceSelected: selectedService.getAttribute('data-text'),
  
  })
    .then(() => {
      alert('Dados armazenados com sucesso.')
    })
    .catch(error => {
      alert('Erro ao armazenar dados: ' + error)
    })
}

function getData() {
  const dbRef = ref(db)

  get(child(dbRef, 'agendamentos/' + date.value))
    .then(snapshot => {
      if (snapshot.exists()) {
        date.value = snapshot.val().dateChoosed
        time.value = snapshot.val().timeChoosed
        selectedService.value = snapshot.val().serviceSelected

        //arrumando a exibição da data
        let currDate = date.value.toString().split('-')
        let finalDate = currDate.reverse().join('/')
        
        messageDate.innerHTML = finalDate
        messageTime.innerHTML = time.value
        messageService.innerHTML = selectedService.value
      } else {
        alert('Informação não encontrada')
      }
    })
    .catch(error => {
      alert('Insucesso, erro ' + error)
    })
}

btnConfirm.addEventListener('click', function () {
  // Verifica se os campos obrigatórios foram preenchidos corretamente
  insertData()

  section1.classList.remove('show')
  section1.classList.add('hide')
  section2.classList.remove('hide')
  section2.classList.add('show')

  getData()

  setTimeout(() => {
    name.value = ''
    date.value = ''
    time.value = ''

    btnService.forEach(element => {
      element.checked = false;
    })

    btnTypeService.forEach(element => {
      element.checked = false;
    })

    section1.classList.remove('hide')
    section1.classList.add('show')
    section2.classList.remove('show')
    section2.classList.add('hide')
  }, 3000)
})
