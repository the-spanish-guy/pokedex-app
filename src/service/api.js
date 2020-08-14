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
  const res = []

  const { results } = await getAllPokemon();

  results.map(async (pokemon) => {
    let poke = {}
    
    const { id, name } = await getSpecificPokemon(pokemon.name)
    const img = await getImagePokemon(name)
    const type = await getColorByType(name)

    poke.id = id
    poke.name = name
    poke.url = img
    poke.color = type

    await Promise.all(res.push(poke))
  })
  // res.map((a) => console.log('teste: ', a))
  return res.sort((a, b) => a - b)
}


// console.log(getPokemon())
export { getAllPokemon, getSpecificPokemon, getImagePokemon, getColorByType, getPokemon }