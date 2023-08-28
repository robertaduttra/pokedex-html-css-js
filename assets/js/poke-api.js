//objeto com funcoes de manipulação

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){

    const pokemon = new Pokemon()        
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
     
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) =>{
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then((convertPokeApiDetailToPokemon))
}

//valores default do offset e limit
pokeApi.getPokemons = (offset = 0, limit = 10) =>{    
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
   
   
    return fetch(url)
//interface comunicacao da promisse
//ja converter a resposta num array de objetos.
    .then((response) => response.json())
//manipulandos os objetos
//filtrando os results do json
    .then((jsonBody) => jsonBody.results)
    //em lista requisicao do detalhe dos pokemons
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    //esperando que todas as requisicaoes terminem
    .then((detailRequests) => Promise.all(detailRequests)) 
    //quando terminarem uma lista de detalhes de pokemons.
    .then((pokemonsDetails) =>  pokemonsDetails )      
}


