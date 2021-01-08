import axios from "axios";
import { getColor } from "../utils/utils";

const pokeApi = axios.create({
  baseURL: "http://192.168.0.30:3333",
});

const getImage = axios.create({
  baseURL:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork",
});

const getAllPokemon = async (page) => {
  if (!page) {
    console.log("aquixigs", page);
    const { data } = await pokeApi.get("/pokemon");
    return data;
  }
  const { data } = await axios.get(page);
  return data;
};

const getSpecificPokemon = async (id) => {
  try {
    const { data } = await pokeApi.get(`/pokemon/${id}`)
    return data
  } catch (error) {
    console.log("[ERROR] Erro while get info from api", error)
  }
};

const getInfo = async (nameorId) => {
  const { data } = await pokeApi.get(`/pokemon-species/${nameorId}/`);
  const { name, flavor_text_entries } = data;
  const description = flavor_text_entries
    .filter((desc) => desc.language.name === "en")
    .sort((a, b) => a.version.url - b.version.url)
    .slice(-1);
  // console.log('name', name)
  // console.log('aaaa', description)

  return description[0].flavor_text;
};

const getCategory = async (nameorId) => {
  const { data } = await pokeApi.get(`/pokemon-species/${nameorId}/`);
  const { genera } = data;
  const [gena] = genera
    .filter((gen) => gen.language.name === "en")
    .map((a) => a.genus.split(" ").shift());
  return gena;
};

const getImagePokemon = async (id) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

const getColorByType = async (name) => {
  const { types } = await getSpecificPokemon(name);

  const result = getColor(types[0].type.name);
  return result;
};

async function getPokemons(){
  try {
    const { data: { data: res } } = await pokeApi.get("/")
    return res
  } catch (error) {
    console.log("[ERROR] Erro while get info from api", error)
  }
};

const getSinglePokemon = async (nameOrId) => {
  try {
    const { data: { data: res } } = await pokeApi.get(`/${nameOrId}`)
    return res
  } catch (error) {
    console.log("[ERROR] Erro while get info from api", error)
  }
};

getCategory(1);
// getPokemons();

export {
  getAllPokemon,
  getSpecificPokemon,
  getImagePokemon,
  getColorByType,
  getPokemons,
  getInfo,
  getCategory,
  getSinglePokemon,
};
