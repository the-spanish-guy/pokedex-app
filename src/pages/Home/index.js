import React, { useState, useEffect } from 'react'
import { AppLoading } from 'expo';
import SvgUri from 'react-native-svg-uri';
import { Ionicons } from "@expo/vector-icons";
import { Text, View, TextInput, FlatList, Image, TouchableOpacity } from 'react-native'
import { useFonts,  Roboto_700Bold, Roboto_400Regular } from "@expo-google-fonts/roboto";
import { useNavigation } from "@react-navigation/native";

import { formatNumber, getTypeIconColor, getIconByType, capitalize } from '../../utils/utils'
import { getPokemon } from '../../service/api'
import styles from './styles'


export default function Home() {
  let [fontLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold})
  const [searchPokemon, setSearchPokemon] = useState('')
  const [pokemon, setPokemon] = useState([])
  const [page, setPage] = useState('')

  const navigation = useNavigation()

  async function getPokemons () {
    setPage('')
    const response = await getPokemon(page)
    console.log('aquiaqui: ', response)
    setPokemon(response[0])
    setPage(response[1])
  }

  // async function nextPage() {
  //   console.log(page)
  //   const response = await getPokemon(page)
  //   setPokemon([...response[0], ...pokemon])
  //   setPage(response[1])
  // }

  function changePage(pokemon, uri) {
    navigation.push('Pokemon', { pokemon, uri })
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
        style={{flex:1}}
        data={pokemon}
        keyExtractor={ ({ id }) => String(id)}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        onEndReached={getPokemons}
        onEndReachedThreshold={0.5}
        renderItem={ ({ item }) => (
          <TouchableOpacity
            style={[styles.containerPokemon, { backgroundColor: item.color }]}
            onPress={() => changePage(item.all, item.url)}
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