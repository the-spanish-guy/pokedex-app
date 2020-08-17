import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { getImagePokemon, getInfo } from "../../service/api";
import Constants from "expo-constants";
import {
  getColor,
  formatNumber,
  getTypeIconColor,
  getIconByType,
  capitalize,
} from "../../utils/utils";
import SvgUri from "react-native-svg-uri";
import { TabView, SceneMap } from "react-native-tab-view";

import Animated, { Easing } from "react-native-reanimated";

export default function pokemon() {
  const route = useRoute();
  const { pokemon, uri } = route.params;
  const [info, setInfo] = useState("");
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "about", title: "About" },
    { key: "status", title: "Status" },
    { key: "evolution", title: "Evolution" },
  ]);
  const [cor, setCor] = useState("");

  async function getInfoPokemon() {
    const res = await getInfo(pokemon.id);
    setInfo(res);
  }

  function getColors() {
    const a = getColor(pokemon.types[0].type.name);
    console.log("CORES: ", a);
    setCor(a);
  }

  useEffect(() => {
    getInfoPokemon();
    getColors();
  }, []);

  function About() {
    return (
      <View style={[styles.container]}>
        <Text style={{ color: "#828282" }}>{info}</Text>
        <View style={{ flexDirection: "row" }}>
          {pokemon.types.map((type) => (
            <View
              style={{
                backgroundColor: getTypeIconColor(type.type.name),
                margin: 8,
                padding: 4,
                height: 30,
                borderRadius: 8,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                
                elevation: 5,
              }}
            >
              <SvgUri
                width="18"
                height="18"
                source={getIconByType(type.type.name)}
              />
              <Text
                style={{
                  marginLeft: 4,
                  color: "#FFFFFF",
                  fontFamily: "Roboto_500Medium",
                  fontSize: 14,
                  textTransform: "uppercase",
                }}
              >
                {type.type.name}
              </Text>
            </View>
          ))}
        </View>

        <Text>Pokédex Data</Text>
        <View style={{
          alignSelf: "center",
          width: '90%',
          padding: 4,
          height: 80,
          borderRadius: 10,
          backgroundColor: '#F6F6F6',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          
          elevation: 5,
        }}>
          <View style={{flexDirection: "row", justifyContent: "space-around"}}>
            <Text>Height</Text>
            <Text>Weight</Text>
            <Text>Gender</Text>
            <Text>Category</Text>
          </View>

          <Text>Abilities</Text>
          {
            pokemon.abilities.map(({ability, is_hidden}) => (
              <>
                <Text>{`${ability.name} ${is_hidden ? '(hidden ability)' : ''} `}</Text>
              </>
            ))
          }
        </View>
      </View>
    );
  }
  function Status() {
    return <View style={[styles.container]} />;
  }
  function Evolution() {
    return <View style={[styles.container]} />;
  }

  const renderScene = SceneMap({
    about: About,
    status: Status,
    evolution: Evolution,
  });

  function renderTabBar(props) {
    const inputRange = routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {routes.map((route, i) => {
          const color = Animated.color(169, 217, 170);

          return (
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: "center",
                padding: 16,
                borderWidth: 2,
                borderColor: "transparent",
              }}
              onPress={() => {
                setIndex(i);
              }}
            >
              <Animated.Text style={{ color: index === i ? cor : "#828282" }}>
                {route.title}
              </Animated.Text>
              <Animated.View
                style={{
                  height: 2,
                  width: index === i ? 80 : 10,
                  backgroundColor: cor,
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          { backgroundColor: getColor(pokemon.types[0].type.name) },
        ]}
      >
        <View style={styles.contentHeader}>
          <Image source={{ uri: uri }} style={styles.imagePokemon} />
          <View style={styles.someInfo}>
            <Text style={styles.numberPokedex}>{formatNumber(pokemon.id)}</Text>
            <Text style={styles.titlePokemon}>{capitalize(pokemon.name)}</Text>
            <View style={styles.contentIcon}>
              {pokemon.types.map((type) => (
                <View
                  style={[
                    styles.iconContent,
                    { backgroundColor: getTypeIconColor(type.type.name) },
                  ]}
                >
                  <SvgUri
                    width="18"
                    height="18"
                    source={getIconByType(type.type.name)}
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
      />

      <View style={styles.pokeball}>
        <SvgUri
          width="100%"
          height="100%"
          source={getIconByType("pokeball")}
          fill="rgba(250,250,250,.4)"
        />
        {/* <Image width="100" height="18" style={{position: "relative"}} source={getIconByType('pokeball')}/> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: "#FFFFFF",
  },

  scene: { flex: 1 },
  pokeball: {
    position: "absolute",
    top: -80,
    right: -40,
    width: 280,
    height: 280,
  },
  header: {
    backgroundColor: "red",
    height: "30%",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingTop: Constants.statusBarHeight + 10,
  },
  contentHeader: {
    // position: "absolute",
    // zIndex: 200,
    flexDirection: "row",
    marginTop: 32,
  },
  someInfo: {
    justifyContent: "center",
  },
  titlePokemon: {
    fontFamily: "Roboto_700Bold",
    color: "#FFFFFF",
    fontSize: 40,
  },
  numberPokedex: {
    fontSize: 40,
    color: "#FFFFFF",
    fontWeight: "bold",
    opacity: 0.4,
  },
  imagePokemon: {
    width: 180,
    height: 180,
    zIndex: 100,
  },
  contentIcon: {
    flexDirection: "row",
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
  },
  tabBar: {
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
});
