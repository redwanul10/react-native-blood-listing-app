import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native'
import BloodApp from './components/bloodApp';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Intro from './components/intro'
import AntDesign from 'react-native-vector-icons/AntDesign';
import AddIcon from 'react-native-vector-icons/Ionicons';
import AddDonor from './screens/add-donor'
import Edit from './screens/edit'
import ImportExport from './screens/import-export'
import AppWrapper from './components/app-wrapper';



const Tab = createBottomTabNavigator();


const MyTabs = () => {
  return (
    <Tab.Navigator
      // backBehavior="history"
      tabBarOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        // showLabel:false,
        safeAreaInsets: {
          bottom: 12,
        },
        tabStyle: {
          justifyContent: "center",
        },
        activeTintColor: "#E63946"

      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />
        }}
        name="Home"
        component={BloodApp}
      />

      <Tab.Screen
        options={{
          tabBarLabel: "Add New",
          tabBarIcon: ({ color, size }) => <AddIcon name="add-circle-outline" size={size} color={color} />
        }}
        name="Settings"
        component={AddDonor}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => <AntDesign name="export" size={size} color={color} />
        }}
        name="imp/exp"
        component={ImportExport}
      />
    </Tab.Navigator>
  );
}

const App = () => {

  const Stack = createStackNavigator();

  return (
    <>
      <AppWrapper>
        <StatusBar backgroundColor="#E63946" />
        <NavigationContainer

        >
          <Stack.Navigator
            screenOptions={{
              ...TransitionPresets.SlideFromRightIOS,
              gestureEnabled: true,
              headerShown: false,
              headerStyle: {
                backgroundColor: "#E63946",
                shadowColor: "transparent",
                elevation: 0
              },
              // headerTintColor: "red"
            }}
          >

            <Stack.Screen options={{ headerShown: false }} name="Home" component={MyTabs} />
            <Stack.Screen name="Intro" component={Intro} />
            <Stack.Screen name="Edit" component={Edit} />

          </Stack.Navigator>
        </NavigationContainer>
      </AppWrapper>
    </>
  );
}

export default App;