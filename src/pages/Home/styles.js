import React from 'react'
import { StyleSheet } from 'react-native'
import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 0,
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: "#FFFFFF"
  },
  title: {
    color: "#F04D3D",
    fontSize: 68,
    fontFamily: 'Roboto_400Regular'
  },
  searchContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 40
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: "hidden",
    borderRadius: 40,
    backgroundColor: "rgba(246, 246, 246, .69)",
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: 'rgba(246, 246, 246, .69)',
    color: '#B2B2B2',
  },
  containerPokemon:{
    borderRadius: 20,
    flexDirection: "row",
    marginTop: 20,
    // marginBottom: 20
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          
          elevation: 5,
  },
  containTextPokemon:{
    flex: 1
  },
  titlePokemon: {
    fontFamily: 'Roboto_700Bold',
    color: '#FFFFFF',
    fontSize: 32
    // '&::first-letter': {
    //   'textTransform': 'uppercase'
    // }
  },
  numberPokedex: {
    position: "absolute",
    fontSize: 50,
    bottom: -10,
    right: 4,
    opacity: .4
  },
  iconContainer: {
    flexDirection: "row",
    // borderWidth: 1
  },
  iconContent: {
    alignItems: "center",
    justifyContent: "center",
    margin: 6,
    width: 26,
    height: 26,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 5,
  }
})