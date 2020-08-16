import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { getImagePokemon, getInfo } from '../../service/api'
import Constants from 'expo-constants'
import { getColor, formatNumber, getTypeIconColor, getIconByType, capitalize } from '../../utils/utils'
import SvgUri from 'react-native-svg-uri';

import pokebola from '../../assets/pokebola.svg'
// const pokebola = require('../../assets/pokebola.svg')
export default function pokemon() {
  const route = useRoute()
  const { pokemon, uri } = route.params
  const [info, setInfo] = useState('')
  
  async function getInfoPokemon(){
    const res = await getInfo(pokemon.id)
    setInfo(res)
  }
  
  useEffect(() => {
    getInfoPokemon()
  },[])
  
  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: getColor(pokemon.types[0].type.name)}]}>
        <View style={styles.contentHeader}>
          <Image source={{ uri: uri }} style={styles.imagePokemon}/>
          <View style={styles.someInfo}>
            <Text style={styles.numberPokedex}>{formatNumber(pokemon.id)}</Text>
            <Text style={styles.titlePokemon}>{capitalize(pokemon.name)}</Text>
            <View style={styles.contentIcon}>
              {
                pokemon.types.map((type) => (
                  <View style={[styles.iconContent, { backgroundColor: getTypeIconColor(type.type.name)}]}>
                    <SvgUri width="18" height="18" source={getIconByType(type.type.name)} />
                  </View>
                ))
              }
            </View>
          </View>
        </View>
          <Text style={styles.titlePokemon}>{info}</Text>
      </View>
      <View style={styles.pokeball}>
        <SvgUri width="100%" height="100%" source={getIconByType('pokeball')} fill="rgba(250,250,250,.4)"/>
        {/* <Image width="100" height="18" style={{position: "relative"}} source={getIconByType('pokeball')}/> */}
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    // backgroundColor: "#FFFFFF"
  },
  pokeball:{
    position: "absolute",
    top: -80,
    right: -40,
    width: 280,
    height: 280,
  },
  header: {
    backgroundColor: 'red',
    height: "30%",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingTop: Constants.statusBarHeight + 10
  },
  contentHeader: {
    // position: "absolute",
    // zIndex: 200,
    flexDirection: "row",
    marginTop: 32
  },
  someInfo:{
    justifyContent: "center"
  },
  titlePokemon: {
    fontFamily: 'Roboto_700Bold',
    color: '#FFFFFF',
    fontSize: 40
  },
  numberPokedex: {
    fontSize: 40,
    color: '#FFFFFF',
    fontWeight: "bold",
    opacity: .4
  },
  imagePokemon: {
    width: 180,
    height: 180,
    zIndex: 100
  },
  contentIcon:{
    flexDirection: "row"
  },
  iconContent: {
    alignItems: "center",
    justifyContent: "center",
    margin: 6,
    width: 26,
    height: 26,
    borderRadius: 50
  }
})