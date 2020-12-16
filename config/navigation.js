import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Signup from '../pages/Signup';
import Login from '../pages/Login';
import ViewProducts from '../pages/ViewProducts';
import AddProduct from '../pages/AddProduct';
import UpdateProduct from '../pages/UpdateProduct';

const NavStack = createStackNavigator();
const NavStackScreen = () => (
  <NavStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Signup">
    <NavStack.Screen name="Signup" component={Signup} />
    <NavStack.Screen name="Login" component={Login} />
    <NavStack.Screen name="ViewProducts" component={ViewProducts} />
    <NavStack.Screen name="AddProduct" component={AddProduct} />
    <NavStack.Screen name="UpdateProduct" component={UpdateProduct} />
  </NavStack.Navigator>
);

const Navigation = () => (
  <NavigationContainer>
    <NavStackScreen />
  </NavigationContainer>
);

export default Navigation;
