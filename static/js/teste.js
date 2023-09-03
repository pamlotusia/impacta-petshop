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
const btnConfirm = document.querySelector('#btn-confirm')
const time = document.querySelector('#input-time')

const bathService = document.querySelector('#banho')
const bathAndGroomingService = document.querySelector('#banho-tosa')

const hygienicGrooming = document.querySelector('#tosa-higienica')
const lowGrooming = document.querySelector('#tosa-baixa')
const mediumGrooming = document.querySelector('#tosa-media')
const highGrooming = document.querySelector('#tosa-alta')

const messageService = document.querySelector('#type-service')
const messageDate = document.querySelector('#day-choosed')
const messageTime= document.querySelector('#time-choosed')

const section1 = document.querySelector('#section-1')
const section2 = document.querySelector('#section-2')

// insert data

function insertData() {
  set(ref(db, 'agendamentos/' + date.value), {
    nameClient: name.value,
    dateChoosed: date.value,
    timeChoosed: time.value
  })
    .then(() => {
      alert('data stored successfully')
    })
    .catch(error => {
      alert('unsuccessfull, error ' + error)
    })
}

function getData() {
  const dbRef = ref(db)

  get(child(dbRef, 'agendamentos/' + date.value))
    .then(snapshot => {
      if (snapshot.exists()){
        date.value = snapshot.val().dateChoosed
        time.value = snapshot.val().timeChoosed

        messageDate.innerHTML = date.value
        messageTime.innerHTML = time.value

      } else {
        alert('No data found')
      }
    })
    .catch(error => {
      alert('unsuccessfull, error ' + error)
    })
}

btnConfirm.addEventListener('click', function () {
  insertData()
  section1.classList.remove('show')
  section1.classList.add('hide')
  section2.classList.remove('hide')
  section2.classList.add('show')

  getData()

  setTimeout(()=>{
    name.value = ''
    date.value = ''
    time.value = ''

    section1.classList.remove('hide')
    section1.classList.add('show')
    section2.classList.remove('show')
    section2.classList.add('hide')
  }, 3000)
})
