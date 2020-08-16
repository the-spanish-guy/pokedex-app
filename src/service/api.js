import axios from 'axios'
import { getColor } from '../utils/utils'

const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2'
})

const getImage = axios.create({
  baseURL: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'
})

const getAllPokemon = async (page) => {
  if(!page) {
    console.log('aquixigs', page)
    const { data } = await pokeApi.get('/pokemon')
    return data
  }
  const { data } = await axios.get(page)
  return data
}

const getSpecificPokemon = async (name) => {
  const response = await pokeApi.get(`/pokemon/${name}`)
  return response.data
}

const getInfo = async (nameorId) => {
  const { data } = await pokeApi.get(`/pokemon-species/${nameorId}/`)
  const { name, flavor_text_entries } = data
  const description = flavor_text_entries
  .filter((desc) => desc.language.name === 'en')
  .sort((a,b) => a.version.url - b.version.url)
  .slice(-1)
  console.log('name', name)
  console.log('aaaa', description)

  return description[0].flavor_text
}

const getImagePokemon = async (id) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

const getColorByType = async (name) => {
  const { types } = await getSpecificPokemon(name)

  const result = getColor(types[0].type.name)
  return result
}

const getPokemon = async(nextPage) => {
  const { results, next } = await getAllPokemon(nextPage);
  let pokemons = results
  const res = []

  pokemons.sort((a,b) => a.url - b.url)
    .map(async (pokemon) => {
      let poke = {}
      
      const po = await getSpecificPokemon(pokemon.name)
      const img = await getImagePokemon(po.id)
      const type = getColor(po.types[0].type.name)

      poke.id = po.id
      poke.name = po.name
      poke.url = img
      poke.color = type
      poke.types = po.types
      poke.all = po

      await Promise.all(
        res.push(poke),
        res.sort((a,b) => a.id - b.id)
        )
    })
  return [res, next]
}

// (getInfo(40))

export { getAllPokemon, getSpecificPokemon, getImagePokemon, getColorByType, getPokemon, getInfo }