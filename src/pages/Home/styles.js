import React from 'react'
import { StyleSheet } from 'react-native'
import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
})