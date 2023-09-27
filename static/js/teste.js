// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js'

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

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth()

// Elementos da página de agendamento
const name = document.querySelector('#input-name')
const date = document.querySelector('#input-date')
const time = document.querySelector('#input-time')
const btnService = document.querySelectorAll('input[name="services"]')
let selectedService
const btnTypeService = document.querySelectorAll('input[name="type-services"]')
let selectedTypeService = null
const btnConfirm = document.querySelector('#btn-confirm')

const messageService = document.querySelector('#type-service')
const messageDate = document.querySelector('#day-choosed')
const messageTime = document.querySelector('#time-choosed')
const section1 = document.querySelector('#section-1')
const section2 = document.querySelector('#section-2')

// Sign in & Sign up elements
const btnSignUp = document.querySelector('#sign-up')
const fullName = document.querySelector('input #username')
const tel = document.querySelector('input #tel')
const email = document.querySelector('input #email')
const password = document.querySelector('input #password') 

// Login & Sign up Page
btnSignUp.addEventListener('click', function(){


  createUserWithEmailAndPassword(auth, fullName.value, email.value, password.value, tel.value)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user
      // ...
      alert('Success!')
    })
    .catch(error => {
      const errorCode = error.code
      const errorMessage = error.message
      alert(errorMessage)
    })

  console.log('oioioioioii')
})

signInWithEmailAndPassword(auth, email, password)
  .then(userCredential => {
    // Signed in
    const user = userCredential.user
    // ...
  })
  .catch(error => {
    const errorCode = error.code
    const errorMessage = error.message
  })


// Atribuindo classe checked aos inputs manualmente
btnService.forEach(element => {
  element.addEventListener('click', function () {
    element.classList.add('.checked')
    selectedService = element
    console.log(selectedService.getAttribute('data-text'))
  })
})
btnTypeService.forEach(element => {
  element.addEventListener('click', function () {
    element.classList.add('.checked')
    selectedTypeService = element
    console.log(selectedTypeService.getAttribute('data-text'))
  })
})

// Funções de inserção de dados no banco
function insertData() {
  // Verifique se os campos obrigatórios foram preenchidos corretamente
  set(ref(db, 'agendamentos/' + date.value), {
    nameClient: name.value,
    dateChoosed: date.value,
    timeChoosed: time.value,
    serviceSelected: selectedService.getAttribute('data-text'),

    //funciona apenas se o serviço selecionado inclui tosa
    typeServiceSelected: selectedTypeService.getAttribute('data-text')
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
        alert('No data found')
      }
    })
    .catch(error => {
      alert('unsuccessfull, error ' + error)
    })
}

btnConfirm.addEventListener('click', function () {
  // Verifica se os campos obrigatórios foram preenchidos corretamente
  insertData()

  // esconde ou exibe sections
  section1.classList.toggle('hide')
  section2.classList.toggle('hide')

  getData()

  setTimeout(() => {
    name.value = ''
    date.value = ''
    time.value = ''

    btnService.forEach(element => {
      element.checked = false
    })

    btnTypeService.forEach(element => {
      element.checked = false
    })

    section1.classList.remove('hide')
    section1.classList.add('show')
    section2.classList.remove('show')
    section2.classList.add('hide')
  }, 3000)
})

