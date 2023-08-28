const pokemonList = document.getElementById('pokemonList');
//pega conteudo e add mais um item.

const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
      <li class="pokemon ${pokemon.type}">
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>

          <div class="detail">
              <ol class="types">
                  ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
              </ol>

              <img src="${pokemon.photo}"
                   alt="${pokemon.name}">
          </div>
      </li>
  `
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = [])=>{ 
    //transformando a lista em html juntando os lis sem separador.
    const newHtml = pokemons.map(convertPokemonToLi).join('')
    pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset,limit)

loadMoreButton.addEventListener('click', () =>{
  offset += limit  

  const qtdRecordNextPage = offset + limit

  if(qtdRecordNextPage >= maxRecords){
    const newLimit = maxRecords - offset 
    loadPokemonItens(offset,limit)

    loadMoreButton.parentElement.removeChild(loadMoreButton)
    
  }else{
    loadPokemonItens(offset,limit)
  }
  
})

