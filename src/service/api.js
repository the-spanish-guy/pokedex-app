import axios from 'axios'
import { getColor } from '../utils/utils'

const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2'
})

const getImage = axios.create({
  baseURL: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'
})

const getAllPokemon = async () => {
  const response = await pokeApi.get('/pokemon')

  // console.log(response.data)
  return response.data
}

const getSpecificPokemon = async (name) => {
  const response = await pokeApi.get(`/pokemon/${name}`)
  return response.data
}

const getImagePokemon = async (name) => {
  const { id } = await getSpecificPokemon(name)
  // const res = await getImage.get(`/${id}.png`)
  // return id;
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  // return res
}

const getColorByType = async (name) => {
  const { types } = await getSpecificPokemon(name)

  const result = getColor(types[0].type.name)
  // console.log(result)
  return result
}

const getPokemon = async() => {
  const { results } = await getAllPokemon();
  // results.sort((a,b) => a.url > b.url ? 1 : -1)
  let pokemons = results
  const res = []

  // pokemons.sort((a, b) => {
  //   if (a-b) {
      
  //   }
  //   console.log('aa:',a)
  //   console.log('bb:',b)
  // })
  pokemons.sort((a,b) => a.url - b.url)
    .map(async (pokemon) => {
      let poke = {}
      
      const { id, name, types } = await getSpecificPokemon(pokemon.name)
      const img = await getImagePokemon(name)
      const type = getColor(types[0].type.name)

      poke.id = id
      poke.name = name
      poke.url = img
      poke.url2 = pokemon.url
      poke.color = type
      poke.types = types

      await Promise.all(
        res.push(poke),
        res.sort((a,b) => a.id - b.id)
        )
    })
  return res
}

export { getAllPokemon, getSpecificPokemon, getImagePokemon, getColorByType, getPokemon }