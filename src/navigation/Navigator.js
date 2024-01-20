import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'

import Partitura from '../screens/partitura'
import Ranking from '../screens/ranking'
import Menu from '../screens/menu'
import Listen from '../screens/listen'
import Pratice from '../screens/pratice'
import Splash from '../screens/splash'
import Settings from '../screens/settings'
import Help from '../screens/help'
const Stack = createStackNavigator ();

export default function App () {
    return(
        <NavigationContainer>
            <Stack.Navigator 
            screenOptions={{
                headerShown: false
              }}>
                {/* <Stack.Screen name ="Splash"  component={Splash}/>  */}
                <Stack.Screen name ="Menu"  options={{  headerLeft: null  }} component={Menu}/> 
                <Stack.Screen name ="Partitura"  component={Partitura}/> 
                <Stack.Screen name ="Listen"  component={Listen}/> 
                <Stack.Screen name ="Settings"  component={Settings}/>
                <Stack.Screen name ="Pratice"  component={Pratice}/> 
                <Stack.Screen name ="Help"  component={Help}/> 
                <Stack.Screen name ="Ranking"  component={Ranking}/> 
             
            </Stack.Navigator>
        </NavigationContainer>
    );
} 