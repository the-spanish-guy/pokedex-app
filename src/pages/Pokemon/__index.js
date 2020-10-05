import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import Animated from "react-native-reanimated";
import Constants from "expo-constants";

export default function TabViewTeste() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
    { key: "third", title: "treste" },
  ]);

  function FirstRoute() {
    return (
      <View
        style={[
          styles.container,
          styles.center,
          { backgroundColor: "#ff4081" },
        ]}
      >
        <Text>TESTE</Text>
      </View>
    );
  }
  function SecondRoute() {
    return (
      <View
        style={[
          styles.container,
          styles.center,
          { backgroundColor: "#673ab7" },
        ]}
      >
        <Text>TESTE</Text>
      </View>
    );
  }
  function ThirdRoute() {
    return (
      <View
        style={[
          styles.container,
          styles.center,
          { backgroundColor: "#F70A5B" },
        ]}
      >
        <Text>TESTE</Text>
      </View>
    );
  }

  const _handleIndexChange = (index) => setIndex(index);

  function _renderTabBar(props) {
    const inputRange = routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const color = Animated.color(
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map((inputIndex) =>
                  inputIndex === i ? 255 : 0
                ),
              })
            ),
            0,
            0
          );

          return (
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: "center",
                padding: 16,
                borderWidth: 2,
                borderColor: "transparent",
                borderBottomColor: index == i ? "red" : "transparent",
              }}
              onPress={() => setIndex(i)}
            >
              <Animated.Text style={{ color }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  const _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={_renderScene}
      renderTabBar={_renderTabBar}
      onIndexChange={setIndex}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight,
    justifyContent: "center",
    alignContent: "center",
  },
});
