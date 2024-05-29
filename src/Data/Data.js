import {
  UilClipboardAlt,
  UilMoneyWithdrawal,
  UilUsdSquare,
} from "@iconscout/react-unicons"

export const AgendamentosData = [
  {
    date: '06/03/2024',
    time: '7:30',
    nameOwner: 'Pam',
    typeService: 'banho e tosa',
    sizeAnimal: 'G',
    price: 'R$85,00',
    state: ['active', 'cancel', 'completed']
  },
  {
    date: '25/02/2024',
    time: '13:30',
    nameOwner: 'Pam',
    typeService: 'banho e tosa',
    sizeAnimal: 'G',
    price: 'R$85,00',
    state: ['active', 'cancel', 'completed']
  },
  {
    date: '26/02/2024',
    time: '13:30',
    nameOwner: 'Fabi',
    typeService: 'apenas banho',
    sizeAnimal: 'P',
    price: 'R$30,00',
    state: ['active', 'cancel', 'completed']
  },
  {
    date: '27/02/2024',
    time: '14:30',
    nameOwner: 'Ju',
    typeService: 'banho e tosa',
    sizeAnimal: 'M',
    price: 'R$50,00',
    state: ['active', 'cancel', 'completed']
  },
  {
    date: '27/02/2024',
    time: '14:30',
    nameOwner: 'Ju',
    typeService: 'banho e tosa',
    sizeAnimal: 'M',
    price: 'R$50,00',
    state: ['active', 'cancel', 'completed']
  },
  {
    date: '27/02/2024',
    time: '14:30',
    nameOwner: 'Ju',
    typeService: 'banho e tosa',
    sizeAnimal: 'M',
    price: 'R$50,00',
    state: ['active', 'cancel', 'completed']
  },
  {
    date: '27/02/2024',
    time: '14:30',
    nameOwner: 'Ju',
    typeService: 'banho e tosa',
    sizeAnimal: 'M',
    price: 'R$50,00',
    state: ['active', 'cancel', 'completed']
  }
]

export const FinanceData = [
  {
    mes: 'Janeiro',
    semanas: [
      { cards: [{ expectativa: 160, rendimento_bruto: 100 }] },
      { cards: [{ expectativa: 160, rendimento_bruto: 160 }] },
      { cards: [{ expectativa: 160, rendimento_bruto: 160 }] },
      { cards: [{ expectativa: 160, rendimento_bruto: 160 }] }
    ]
  },
  {
    mes: 'Fevereiro',
    semanas: [
      { cards: [{ expectativa: 160, rendimento_bruto: 100 }] },
      { cards: [{ expectativa: 160, rendimento_bruto: 160 }] },
      { cards: [{ expectativa: 160, rendimento_bruto: 160 }] },
      { cards: [{ expectativa: 160, rendimento_bruto: 160 }] }
    ]
  },
  {
    mes: 'Março',
    semanas: [
      { cards: [{ expectativa: 160, rendimento_bruto: 100 }] },
      { cards: [{ expectativa: 160, rendimento_bruto: 160 }] },
      { cards: [{ expectativa: 160, rendimento_bruto: 160 }] },
      { cards: [{ expectativa: 160, rendimento_bruto: 160 }] }
    ]
  }
]

export const CardsData = [
  {
    title: 'Sales',
    color: {
      backGround: "linear-gradient(180deg,  #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "25,970",
    png: UilUsdSquare,
    series: [
      {
        name: "Sales", 
        data: [31, 40, 28, 51, 42, 109, 100]
      }
    ]
  },
  {
    title: 'Revenue',
    color: {
      backGround: "linear-gradient(180deg, #ff919d 0%, #fc929d 100%)",
      boxShadow: "0px 10px 20px 0px #fdc0c7",
    },
    barValue: 80,
    value: "14,270",
    png: UilMoneyWithdrawal,
    series: [
      {
        name: 'Revenue',
        data: [10, 100,50,70,80,30,40]
      }
    ]
  },
  {
    title: 'Expanses',
    color: {
      backGround: "linear-gradient(rgb(248,212,154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #f9d59b",
    },
    barValue: 60,
    value: "4,270",
    png: UilClipboardAlt,
    series: [
      {
        name: 'Expanses',
        data: [10, 25, 15, 30, 12, 15, 20]
      }
    ]
  }
]