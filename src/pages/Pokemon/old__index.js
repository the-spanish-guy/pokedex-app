import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import Constants from 'expo-constants';

export default function TabViewTeste() {
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
    { key: 'tres', title: 'treste'}
  ]);

function FirstRoute(){ return (
  <View style={[styles.container, { backgroundColor: '#ff4081' }]} >
    <Text>TESTE</Text>
  </View>
)};
function SecondRoute() {return(
  <View style={[styles.container, { backgroundColor: '#673ab7' }]} />
)};
function TresRoute(){ return(
  <View style={[styles.container, { backgroundColor: '#F00f00' }]} />
);}

  const _handleIndexChange = index => setIndex(index);

  function _renderTabBar(props) {
    const inputRange = routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const color = Animated.color(
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map(inputIndex =>
                  inputIndex === i ? 255 : 0
                ),
              })
            ),
            0,
            0
          );

          return (
            <TouchableOpacity
              style={{flex: 1,
    alignItems: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    borderBottomColor: index == i ? 'red' : 'transparent'
  }}
              onPress={() => setIndex(i)}>
              <Animated.Text style={{color}}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    tres: TresRoute,
  });

  return (
    <TabView
      navigationState={{index, routes}}
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
  tabBar: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});
