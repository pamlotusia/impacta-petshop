let bathingAndGrooming = document.querySelector('#bathing-grooming')
let typesOfGrooming = document.querySelector('.type-grooming')

bathingAndGrooming.addEventListener('click', function () {
  console.log('Clique no elemento de banho e higiene');
  typesOfGrooming.classList.remove('hide')
})
