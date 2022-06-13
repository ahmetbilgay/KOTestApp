import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomepageScreen from '../scenes/HomepageScreen';
import EpisodeInfoScreen from '../scenes/EpisodeInfoScreen';
import CharacterInfo from '../scenes/CharacterInfo';

const Stack = createNativeStackNavigator();

const optionsFunction = title => {
  return {
    title: title,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#010835',
    },
  };
};

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomepageScreen">
      <Stack.Screen
        name="HomepageScreen"
        component={HomepageScreen}
        options={optionsFunction('Bölümler')}
      />
      <Stack.Screen
        name="EpisodeInfoScreen"
        component={EpisodeInfoScreen}
        options={optionsFunction('Bölüm Bilgisi')}
      />
      <Stack.Screen
        name="CharacterInfo"
        component={CharacterInfo}
        options={optionsFunction('Karakter Bilgisi')}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
