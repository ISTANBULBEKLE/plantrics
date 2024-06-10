// App.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CameraScreen from './src/screens/CameraScreen';
import ResultScreen from './src/screens/ResultSecreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CameraScreen">
        <Stack.Screen
          name="CameraScreen"
          component={CameraScreen}
          options={{title: 'Take a Picture'}}
        />
        <Stack.Screen
          name="ResultScreen"
          component={ResultScreen}
          options={{title: 'Result'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
