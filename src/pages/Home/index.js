import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, FlatList, Image } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { useFonts,  Roboto_700Bold, Roboto_400Regular } from "@expo-google-fonts/roboto";
import { AppLoading } from 'expo';

import styles from './styles'
import { formatNumber } from '../../utils/utils'

import { getAllPokemon, getImagePokemon, getColorByType, getPokemon } from '../../service/api'

export default function Home() {
  let [fontLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold})
  const [searchPokemon, setSearchPokemon] = useState('')
  const [pokemon, setPokemon] = useState([])

  async function getPokemons () {
    const response = await getPokemon()    
    console.log('aquiaqui: ', response)
    setPokemon(response)
  }

  async function getImg (item) {
    // console.log(item)
    const { name } = item
    let datas = { name: { url: '' } }
    const result = await getImagePokemon(name)
      .then((res) => { return datas.name.url = res })
      .catch((e) => console.log('error: ', e));

    return result
  }

  function Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(() => {
    getPokemons()
  }, [])


  if (!fontLoaded) {
    return <AppLoading />;
  }else{
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokédex</Text>
      <View style={styles.searchContainer}>
        <View style={styles.searchSection}>
          <Ionicons style={styles.searchIcon} name="ios-search" size={20} color="#000"/>
          <TextInput
            style={styles.input}
            placeholder="Search for a Pokémon"
            value={searchPokemon}
            onChangeText={(e) => setSearchPokemon(e)}
            underlineColorAndroid="transparent"
          />
        </View>
        <Ionicons style={styles.searchIcon} name="ios-options" size={20} color="#000"/>
      </View>
      <Text>The Pokédex contains detailed stats for every creature from the Pokémon games.</Text>

      <FlatList
        style={{width: "90%", height: 'auto'}}
        data={pokemon}
        keyExtractor={ ({item}) => item}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        renderItem={ ({ item }) => (
          <View style={[styles.containerPokemon, { backgroundColor: item.color }]}>
            <Image source={{ uri: item.url }} style={{width: 100, height: 100}}/>
            <View>
              <Text style={styles.titlePokemon}>{Capitalize(item.name)}</Text>
              <Text style={[styles.titlePokemon, styles.numberPokedex]}>#{formatNumber(item.id)}</Text>
            </View>
          </View>
        )}
      />
    </View>
  )}
}