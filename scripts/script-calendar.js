const isLeapYear = year => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  )
}
const getFebDays = year => {
  return isLeapYear(year) ? 29 : 28
}

let calendar = document.querySelector('.calendar')
const month_picker = document.querySelector('#month-picker')
const month_names = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
]

const generateCalendar = (month, year) => {
  let calendar_days = document.querySelector('.calendar-days')
  calendar_days.innerHTML = ''
  let calendar_header_year = document.querySelector('#year')
  let days_of_month = [
    31,
    getFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
  ]

  let currentDate = new Date()

  calendar_header_year.innerHTML = year

  let first_day = new Date(year, month)

  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
    let day = document.createElement('div')

    if (i >= first_day.getDay()) {
      day.innerHTML = i - first_day.getDay() + 1

      if (
        i - first_day.getDay() + 1 === currentDate.getDate() &&
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth()
      ) {
        day.classList.add('current-date')
      }
    }
    calendar_days.appendChild(day)
  }
}

//cria as options do mês
month_names.forEach((e, index) => {
  let month = document.createElement('option')
  month.value = index
  month.textContent = e
  month_picker.appendChild(month)
})

//altera os dias do calendário de acordo com o mês selecionado
month_picker.addEventListener('change', () =>{
  let selectedMonth = parseInt(month_picker.value)
  generateCalendar(selectedMonth, currentYear.value)
})

//muda o ano
document.querySelector('#pre-year').onclick = () => {
  currentYear.value--
  generateCalendar(currentMonth.value, currentYear.value)
}

document.querySelector('#next-year').onclick = () => {
  currentYear.value++
  generateCalendar(currentMonth.value, currentYear.value)
}

let currentDate = new Date()
let currentMonth = { value: currentDate.getMonth() }
let currentYear = { value: currentDate.getFullYear() }

//inicia o cabeçalho do calendario no mês atual
month_picker.value = currentMonth.value

//inicia o proprio calendario com a data atual
generateCalendar(currentMonth.value, currentYear.value)
