// import { generateCalendar} from './script-calendar.js';

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";

import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://petshop-impacta-ae693-default-rtdb.firebaseio.com"
}

let botaoConfirma = document.querySelector("#confirm"); 
botaoConfirma.addEventListener('click', () => {
  generateCalendar(currentMonth.value, currentYear.value, (selectedDate) => {
    if (selectedDate) {
      saveSelectedDateToDatabase(selectedDate);
      console.log('Data salva no banco de dados:', selectedDate);
    } else {
      console.log('Nenhuma data selecionada.');
    }
  });
});

const app = initializeApp(appSettings)
const database = getDatabase(app)




