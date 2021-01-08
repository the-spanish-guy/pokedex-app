import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ProgressBarAndroid,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { getImagePokemon, getInfo, getCategory } from "../../service/api";
import { getVulnarability } from "../../utils/utils";
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
import female from "../../assets/female.svg";
import { Ionicons } from "@expo/vector-icons";

import Animated, { Easing } from "react-native-reanimated";

export default function pokemon() {
  const route = useRoute();
  const { pokemon, dataPokemon } = route.params;
  const [info, setInfo] = useState("");
  const [category, setCategory] = useState("");
  const [index, setIndex] = useState(0);
  const [color, setColor] = useState("");
  const [routes] = useState([
    { key: "about", title: "About" },
    { key: "status", title: "Status" },
    { key: "evolution", title: "Evolution" },
  ]);

  async function getOtherColor() {
    const color = getTypeIconColor(pokemon.types[0].type.name);
    setColor(color);
  }

  useEffect(() => {
    getOtherColor();
  });

  function About() {
    return (
      <View style={[styles.container, { width: "90%", alignSelf: "center" }]}>
        <Text style={{ color: "#828282", fontSize: 18 }}>{pokemon.info}</Text>
        <View style={{ flexDirection: "row", marginBottom: 12 }}>
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

        <Text
          style={{
            color: color,
            fontFamily: "Roboto_700Bold",
            fontSize: 22,
            marginBottom: 18,
          }}
        >
          Pokédex Data
        </Text>
        {dataPokemon.map((data) => (
          <>
            <View
              style={{
                alignSelf: "center",
                width: "100%",
                padding: 4,
                // height: 80,
                borderRadius: 10,
                backgroundColor: "#FCFCFC",
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
              <View>
                {/* thead */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginBottom: 8,
                  }}
                >
                  <Text>Height</Text>
                  <Text>Weight</Text>
                  <Text>Gender</Text>
                  <Text>Category</Text>
                </View>

                {/* tbody */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ color: color, fontFamily: "Roboto_500Medium" }}
                  >
                    {data.poke_data.height}
                  </Text>
                  <Text
                    style={{ color: color, fontFamily: "Roboto_500Medium" }}
                  >
                    {data.poke_data.weight}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      width: 34,
                    }}
                  >
                    {data.poke_data.gender.map((g) => (
                      <>
                        {g === "unknow" ? (
                          <Text>{g}</Text>
                        ) : (
                          <Ionicons
                            style={[styles.searchIcon, { color: color }]}
                            name={`md-${g}`}
                            size={18}
                          />
                        )}
                      </>
                    ))}
                  </View>
                  <Text
                    style={{ color: color, fontFamily: "Roboto_500Medium" }}
                  >
                    {data.poke_data.category}
                  </Text>
                </View>
                <View style={{ justifyContent: "space-between", margin: 20 }}>
                  <Text
                    style={{
                      fontFamily: "Roboto_400Regular",
                      fontSize: 16,
                      marginBottom: 2,
                    }}
                  >
                    Abilities
                  </Text>
                  {data.poke_data.abilities.map((item, index) => (
                    <>
                      <Text
                        style={{
                          color: color,
                          fontFamily: "Roboto_500Medium",
                          marginTop: 6,
                        }}
                      >{`${index + 1}.  ${item.ability.name} ${
                        item.is_hidden ? "(hidden ability)" : ""
                      } `}</Text>
                    </>
                  ))}
                </View>
                <Text
                  style={{
                    fontFamily: "Roboto_400Regular",
                    fontSize: 16,
                    marginBottom: 2,
                  }}
                >
                  Weakness
                </Text>
                <View style={styles.contentIcon}>
                  {data.poke_data.weakness.map((w) => (
                    <View
                      style={[
                        styles.iconContent,
                        { backgroundColor: getTypeIconColor(w) },
                      ]}
                    >
                      <SvgUri
                        width="20"
                        height="20"
                        source={getIconByType(w)}
                      />
                    </View>
                  ))}
                </View>
              </View>
            </View>
            <View style={{marginTop: 20, marginBottom: 20}}>
              <Text
                style={{
                  color: color,
                  fontFamily: "Roboto_700Bold",
                  fontSize: 22,
                  marginBottom: 18,
                }}
              >
                Training
              </Text>

              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View style={{ width: "50%" }}>
                  <Text style={{ fontWeight: "medium", fontSize: 16 }}>
                    Catch rate
                  </Text>
                  <Text style={{ fontWeight: "medium", fontSize: 16 }}>
                    Base Friendship
                  </Text>
                  <Text style={{ fontWeight: "medium", fontSize: 16 }}>
                    Base Exp.
                  </Text>
                  <Text style={{ fontWeight: "medium", fontSize: 16 }}>
                    Growth Rate
                  </Text>
                  <Text style={{ fontWeight: "medium", fontSize: 16 }}>
                    EV yield
                  </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={{ color, fontSize: 16 }}>
                    {data.training.catch_rate}
                  </Text>
                  <Text style={{ color, fontSize: 16 }}>
                    {data.training.base_friendship}
                  </Text>
                  <Text style={{ color, fontSize: 16 }}>
                    {data.training.base_exp}
                  </Text>
                  <Text style={{ color, fontSize: 16 }}>
                    {data.training.growth_rate}
                  </Text>
                  {data.training.ev_yield.map((t) => (
                    <Text style={{ color, fontSize: 16 }}>
                      {t.effort} {t.stat.name}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </>
        ))}
      </View>
    );
  }
  function Status() {
    return (
      <View style={[styles.container]}>
        {/* <Text>Base Stats</Text>
        {pokemon.stats.map((st) => (
          <View>
            <View style={{flexDirection: "row"}}>
              <Text style={{ color: "black" }}>{st.stat.name}</Text>
              <Text style={{ color: "black" }}>{st.base_stat}</Text>
              <ProgressBarAndroid styleAttr="Horizontal" color={color2} indeterminate={false} progress={st.base_stat/100} />
            </View>
          </View>
        ))} */}
      </View>
    );
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
              <Animated.Text
                style={{ color: index === i ? pokemon.color : "#828282" }}
              >
                {route.title}
              </Animated.Text>
              <Animated.View
                style={{
                  height: 2,
                  width: index === i ? 80 : 10,
                  backgroundColor: pokemon.color,
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
          <Image source={{ uri: pokemon.url }} style={styles.imagePokemon} />
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
                    width="20"
                    height="20"
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
    width: 30,
    height: 30,
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
