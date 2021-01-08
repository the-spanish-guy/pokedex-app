import React, { useState, useEffect } from 'react'
import { AppLoading } from 'expo';
import SvgUri from 'react-native-svg-uri';
import { Ionicons } from "@expo/vector-icons";
import { Text, View, TextInput, FlatList, Image, TouchableOpacity } from 'react-native'
import { useFonts,  Roboto_700Bold, Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";
import { useNavigation } from "@react-navigation/native";

import { formatNumber, getTypeIconColor, getIconByType, capitalize } from '../../utils/utils'
import { getPokemons, getSpecificPokemon, getSinglePokemon } from '../../service/api'
import styles from './styles'


export default function Home() {
  let [fontLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold, Roboto_500Medium})
  const [searchPokemon, setSearchPokemon] = useState('')
  const [pokemon, setPokemon] = useState([])
  const [hasRefresh, setHasRefresh] = useState(true);
  const [page, setPage] = useState('')

  const navigation = useNavigation()

  async function loadPokemon() {
    const data = await getPokemons();
    setHasRefresh(false)
    setPokemon(data)
  }

  // async function nextPage() {
  //   console.log(page)
  //   const response = await getPokemon(page)
  //   setPokemon([...response[0], ...pokemon])
  //   setPage(response[1])
  // }

  async function changePage(pokemon) {
    const data = await getSpecificPokemon(pokemon.id);
    console.log(data)
    const obj = {
      pokemon,
      dataPokemon: [data]
    }
    navigation.push('Pokemon', obj)
  }
  async function seachPokemon(name) {
    console.log(searchPokemon)
    const data = await getSinglePokemon(name);
    setHasRefresh(false)
    setPokemon(data)
  }

  useEffect(() => {
    // getPokemons();
    if(hasRefresh !== false) {
      console.log(hasRefresh)
      loadPokemon();
      return
    }
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
            onEndEditing={() => seachPokemon(searchPokemon)}
          />
        </View>
        <Ionicons style={styles.searchIcon} name="ios-options" size={20} color="#000"/>
      </View>

      <Text>The Pokédex contains detailed stats for every creature from the Pokémon games.</Text>

      <FlatList
        style={{flex:1}}
        data={pokemon}
        keyExtractor={ ({ id }) => String(id)}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        onEndReached={loadPokemon}
        onEndReachedThreshold={0.5}
        renderItem={ ({ item }) => (
          <TouchableOpacity
            style={[styles.containerPokemon, { backgroundColor: item.color }]}
            onPress={() => changePage(item)}
          >
            <Image source={{ uri: item.url }} style={{width: 100, height: 100}}/>
            <View style={styles.containTextPokemon}>
              <View style={{marginTop: 8, marginLeft: 8}}>
                <Text style={styles.titlePokemon}>{capitalize(item.name)}</Text>
                <View style={styles.iconContainer}>
                  {
                    item.types.map((type) => (
                      <View style={[styles.iconContent, { backgroundColor: getTypeIconColor(type.type.name)}]}>
                        <SvgUri width="18" height="18" source={getIconByType(type.type.name)} />
                      </View>
                    ))
                  }
                </View>
              </View>
              <Text style={[styles.titlePokemon, styles.numberPokedex]}>{formatNumber(item.id)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )}
}