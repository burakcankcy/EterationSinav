import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddSimpsonScreen from '../screens/AddSimpsonScreen';
import DetailSimpsonScreen from '../screens/DetailSimpsonScreen';

const Stack = createStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Simpsons'}}
        />
        <Stack.Screen
          name="AddSimpson"
          component={AddSimpsonScreen}
          options={{title: 'Add New Character'}}
        />
        <Stack.Screen
          name="DetailSimpson"
          component={DetailSimpsonScreen}
          options={{title: 'Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
