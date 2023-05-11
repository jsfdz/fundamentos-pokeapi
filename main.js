/* ===== GET HTML ELEMENT ===== */
const app = document.querySelector('.app')
const search = document.querySelector('.app__search')
const appContainer = document.querySelector('.app__container')

/* ===== VARIABLES ===== */
const URL = 'https://pokeapi.co/api/v2/pokemon'
let nextData = ''
let prevData = ''

/* ===== FUNCTIONS ===== */
async function getData (url) {
  const res = await window.fetch(url)
  const data = await res.json()

  nextData = data.next
  prevData = data.previous

  printPokemons(data.results)
}

function printPokemons (pokemons) {
  let html = ''
  for (const pokemon of pokemons) {
    window.fetch(pokemon.url)
      .then((res) => res.json())
      .then((data) => {
        html += `
        <div class="app__item">
          <img src="${data.sprites.other['official-artwork'].front_default}" alt="${data.name}" class="app__item-img">
          <h2 class="app__item-name">${data.name}</h2>
        </div>
        `
        appContainer.innerHTML = html
      })
  }
}

async function printPokemon (text) {
  let html = ''
  try {
    const res = await window.fetch(`${URL}/${text}`)
    const data = await res.json()

    html += `
    <div class="app__item">
      <img src="${data.sprites.other['official-artwork'].front_default}" alt="${data.name}" class="app__item-img">
      <h2 class="app__item-name">${data.name}</h2>
    </div>
    `
  } catch (error) {
    html += `
    <h2> No se encontró el pokemon </h2>
    `
  }
  appContainer.innerHTML = html
}

function btnNext () {
  if (!nextData) {
    window.alert('No hay más pokemons')
    return
  }

  getData(nextData)
}

function btnPrev () {
  if (!prevData) {
    window.alert('Estas en la primera página')
    return
  }

  getData(prevData)
}

getData(URL)

/* ===== LISTENERS ===== */
app.addEventListener('click', (e) => {
  if (e.target.classList.contains('button--prev')) {
    btnPrev()
  }

  if (e.target.classList.contains('button--next')) {
    btnNext()
  }

  if (e.target.classList.contains('button--initial')) {
    getData(URL)
  }
})

search.addEventListener('change', () => {
  const text = search.value.toLowerCase().trim()

  if (text !== '') {
    printPokemon(text)
  } else {
    getData(URL)
  }
})
