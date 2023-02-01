import React, { useContext } from 'react';
import { Box, Icon, Image } from 'native-base';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/auth-context';
import {
  SettingsStackNavigator,
  HomeStackNavigator,
  AccountStackNavigator,
  LoadStackNavigator,
  ExpenseStackNavigator,
  ChartStackNavigator,
} from './stackNav';

const BottomNav = () => {
  const Tab = createMaterialBottomTabNavigator();
  const auth = useContext(AuthContext);
  return (
    <Box flex={1}>
      <Tab.Navigator
        activeColor='#f0edf6'
        inactiveColor='#3e2465'
        barStyle={{
          elevation: 0,
          backgroundColor: 'white',
        }}
      >
        {auth.isLoggedIn && (
          <Tab.Screen
            name='Setting'
            component={SettingsStackNavigator}
            options={{
              tabBarIcon: () => (
                <Box>
                  <Icon
                    color='darkBlue.700'
                    size='30'
                    as={<MaterialCommunityIcons name='cog' />}
                  />
                </Box>
              ),
              tabBarLabel: false,
            }}
          />
        )}
        {!auth.isLoggedIn && (
          <Tab.Screen
            name='Home'
            component={HomeStackNavigator}
            options={{
              tabBarIcon: () => (
                <Box>
                  <Icon
                    color='logo.300'
                    size='35'
                    as={<MaterialCommunityIcons name='home' />}
                  />
                </Box>
              ),
              tabBarLabel: false,
            }}
          />
        )}
        {auth.isLoggedIn && (
          <Tab.Screen
            name='Loads'
            component={LoadStackNavigator}
            options={{
              tabBarIcon: () => (
                <Box>
                  <Icon
                    color='green.300'
                    size='30'
                    as={<MaterialCommunityIcons name='truck-delivery' />}
                  />
                </Box>
              ),
              tabBarLabel: false,
            }}
          />
        )}
        {auth.isLoggedIn && (
          <Tab.Screen
            name='Account'
            component={AccountStackNavigator}
            options={{
              tabBarIcon: () => (
                <Box>
                  <Icon
                    color='logo.300'
                    size='30'
                    as={<MaterialCommunityIcons name='account' />}
                  />
                </Box>
              ),
              tabBarLabel: false,
            }}
          />
        )}
        {auth.isLoggedIn && (
          <Tab.Screen
            name='Expenses'
            component={ExpenseStackNavigator}
            options={{
              tabBarIcon: () => (
                <Box>
                  <Icon
                    color='red.700'
                    size='30'
                    as={<MaterialCommunityIcons name='gas-station' />}
                  />
                </Box>
              ),
              tabBarLabel: false,
            }}
          />
        )}
        {auth.isLoggedIn && (
          <Tab.Screen
            name='Charts'
            component={ChartStackNavigator}
            options={{
              tabBarIcon: () => (
                <Box>
                  <Icon
                    color='violet.700'
                    size='30'
                    as={<MaterialCommunityIcons name='chart-bar-stacked' />}
                  />
                </Box>
              ),
              tabBarLabel: false,
            }}
          />
        )}
      </Tab.Navigator>
    </Box>
  );
};

export default BottomNav;
