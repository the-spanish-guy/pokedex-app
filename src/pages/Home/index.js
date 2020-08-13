import React, { useState } from 'react'
import { Text, View, TextInput, FlatList, Image } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { useFonts,  Roboto_700Bold, Roboto_400Regular } from "@expo-google-fonts/roboto";
import { AppLoading } from 'expo';

import styles from './styles'

const DATA = [
  {
    id: 1,
    name: 'Bulbassaur',
    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
  },
  {
    id: 2,
    name: 'charmander',
    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png'
  }
]

export default function Home() {
  let [fontLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold})
  const [searchPokemon, setSearchPokemon] = useState('')

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
        data={DATA}
        keyExtractor={ item => item.id}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View>
            <Image source={{ uri: item.img }} style={{width: 100, height: 40}}/>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  )}
}