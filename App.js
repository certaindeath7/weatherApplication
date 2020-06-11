

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';

//import navigation container
import { NavigationContainer } from '@react-navigation/native';

//import bottom bar navigation container
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//import material icons dependencies
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"


import Search from './screens/Search';
import WeatherScreen from './screens/Home';
import UserSignUp from './screens/Signup';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f99d12" />
      <NavigationContainer>
        <Tab.Navigator

          //destructure props
          screenOptions={({ route }) => ({ //return an object
            tabBarIcon: ({ color }) => {  //destruture color
              let iconName;

              if (route.name === "Search") { //strict equality comparison. if the types are differerent, return false
                iconName = 'cloud-search' // get the icon from https://oblador.github.io/react-native-vector-icons/
              } else if (route.name === "Home") {
                iconName = 'city'
              } 

              return <MaterialCommunityIcons name={iconName} size={25} color={color} />
            }
          })}
          tabBarOptions={{
            // highlight the active tab 
            activeTintColor: "white",
            inactiveTintColor: "gray",
            activeBackgroundColor: "#f99d12",
            inactiveBackgroundColor: "#f99d12"
          }}

        >
          <Tab.Screen name="Signup" component={UserSignUp} />
          <Tab.Screen name="Search" component={Search} />
          <Tab.Screen name="Home" component={WeatherScreen}
            //the first city will pop up once the app loaded
            initialParams={{ place: "Paris" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};



export default App;
