import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { Box, Icon, Image, IconButton, HStack, Text } from 'native-base';
import { Platform } from 'react-native';
import Settings from '../components/settings/settings';
import HomeScreen from '../components/homeScreen';
import Account from '../components/accounts';
import LoadReports from '../components/loadReports';
import SignedInPaywall from '../components/signedInPaywall';
import LoadsGenerator from '../components/reportCards/loadReportCard';
import ExpenseReports from '../components/expenseReports';
import ChartedData from '../components/chartInfo';
import LoadCard from '../components/reportViews/loadCards';
import ExpenseCard from '../components/reportViews/expenseCards';
import ResetPass from '../components/resetpass/resetPass';
import Register from '../components/Registration/registerUser';
import SubmitLoads from '../components/submitDetails/submitLoads';
import SubmitExpenses from '../components/submitDetails/submitExpenses';
import ExportFiles from '../exportData/exportData';
import Paywall from '../components/paywall';
import { AuthContext } from '../context/auth-context';

const screen = Dimensions.get('window').width;

const Stack = createStackNavigator();
const options = { headerTitleAlign: 'center' };
const Logo = () => {
  return (
    <Image
      source={require('../assets/SimplifiedLong.png')}
      alt='logo'
      marginTop={Platform.OS === 'ios' ? 9 : 0}
      marginBottom='auto'
      style={{ width: screen - 50, height: 125 }}
    />
  );
};

// Setting Navigators

const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'blue',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 2,
        },
        headerTintColor: 'white',
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen
        name='Settings'
        component={Settings}
        options={{
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Box mx='auto'>
              <Icon
                color='green.300'
                size='7'
                as={<MaterialCommunityIcons name='cog' />}
              />
            </Box>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

// Home Navigators

const HomeStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Login Account'
        component={HomeScreen}
        options={{
          backgroundColor: 'white',
          headerTransparent: true,
          headerTintColor: 'black',
          headerTitle: (props) => (
            <Box marginTop={Platform.OS === 'ios' ? 6 : 6}>
              <Logo {...props} />
            </Box>
          ),
        }}
      />
      <Stack.Screen
        name='Forgot Password'
        component={ResetPass}
        options={{
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerTransparent: true,

          headerLeft: () => (
            <IconButton
              variant='none'
              onPress={() => navigation.navigate('Login Account')}
              icon={
                <HStack space={1}>
                  <Icon
                    color='coolGray.200'
                    size='7'
                    as={<MaterialCommunityIcons name='arrow-left' />}
                  />
                  <Text alignSelf='center' fontSize='md' color='white'>
                    Login
                  </Text>
                </HStack>
              }
            />
          ),
        }}
      />
      <Stack.Screen
        name='Paywall'
        component={Paywall}
        options={{ headerTransparent: true, headerShown: false }}
      />
      <Stack.Screen
        name='Register'
        component={Register}
        options={{
          headerTitleAlign: 'center',
          headerTransparent: true,
          headerTintColor: 'white',
          headerLeft: () => (
            <IconButton
              variant='none'
              onPress={() => navigation.navigate('Login Account')}
              icon={
                <HStack space={1}>
                  <Icon
                    color='coolGray.200'
                    size='7'
                    as={<MaterialCommunityIcons name='arrow-left' />}
                  />
                  <Text alignSelf='center' fontSize='md' color='white'>
                    Login
                  </Text>
                </HStack>
              }
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

// Account Navigators

const AccountStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === 'ios' ? 'white' : 'white',
        },
      }}
    >
      <Stack.Screen
        name='Account View'
        component={Account}
        options={{
          headerTransparent: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='SignedInPaywall'
        component={SignedInPaywall}
        options={{ headerTransparent: true, headerShown: false }}
      />

      <Stack.Screen
        name='Export Files'
        component={ExportFiles}
        options={{
          headerTintColor: 'black',
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Icon
              color='green.400'
              size='7'
              as={<MaterialCommunityIcons name='file-export' />}
            />
          ),

          headerLeft: () => (
            <IconButton
              variant='none'
              onPress={() => navigation.navigate('Account View')}
              icon={
                <HStack space={1}>
                  <Icon
                    color='green.400'
                    size='7'
                    as={<MaterialCommunityIcons name='arrow-left' />}
                  />
                  <Text alignSelf='center' fontSize='md' color='black'>
                    Overview
                  </Text>
                </HStack>
              }
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

// Load Navigators

const LoadStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: 'green',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 2,
        },
      }}
    >
      <Stack.Screen
        name='Load Reports'
        component={LoadsGenerator}
        options={{
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Icon
              color='green.400'
              size='7'
              as={<MaterialCommunityIcons name='truck-delivery' />}
            />
          ),

          headerLeft: () => (
            <IconButton
              variant='none'
              onPress={() => navigation.navigate('Submit Load')}
              icon={
                <HStack space={1}>
                  <Icon
                    color='violet.400'
                    size='7'
                    as={<MaterialCommunityIcons name='plus' />}
                  />
                  <Text alignSelf='center' fontSize='md' color='white'>
                    Submit Load
                  </Text>
                </HStack>
              }
            />
          ),
        }}
      />
      <Stack.Screen
        name='Submit Load'
        component={SubmitLoads}
        options={{
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Icon
              color='green.400'
              size='7'
              as={<MaterialCommunityIcons name='truck-delivery' />}
            />
          ),
          headerLeft: () => (
            <IconButton
              variant='none'
              onPress={() => navigation.navigate('Load Reports')}
              icon={
                <HStack space={1}>
                  <Icon
                    color='violet.400'
                    size='7'
                    as={<MaterialCommunityIcons name='arrow-left' />}
                  />
                  <Text alignSelf='center' fontSize='md' color='white'>
                    Load Reports
                  </Text>
                </HStack>
              }
            />
          ),
        }}
      />
      <Stack.Screen
        name='Load'
        component={LoadCard}
        options={{
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Box mx='auto'>
              <Icon
                color='green.400'
                size='7'
                as={<MaterialCommunityIcons name='truck-delivery' />}
              />
            </Box>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

// Expense Navigators
const ExpenseStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName='Expense Reports'
      screenOptions={{
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: 'red',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 2,
        },
      }}
    >
      <Stack.Screen
        name='Expense Reports'
        component={ExpenseReports}
        options={{
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Icon
              color='red.400'
              size='7'
              as={<MaterialCommunityIcons name='gas-station' />}
            />
          ),

          headerLeft: () => (
            <IconButton
              variant='none'
              onPress={() => navigation.navigate('Submit Expense')}
              icon={
                <HStack space={1}>
                  <Icon
                    color='violet.400'
                    size='7'
                    as={<MaterialCommunityIcons name='plus' />}
                  />
                  <Text alignSelf='center' fontSize='md' color='white'>
                    Submit Expense
                  </Text>
                </HStack>
              }
            />
          ),
        }}
      />
      <Stack.Screen
        name='Submit Expense'
        component={SubmitExpenses}
        options={{
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Icon
              color='red.400'
              size='7'
              as={<MaterialCommunityIcons name='gas-station' />}
            />
          ),
          headerLeft: () => (
            <IconButton
              variant='none'
              onPress={() => navigation.navigate('Expense Reports')}
              icon={
                <HStack space={1}>
                  <Icon
                    color='violet.400'
                    size='7'
                    as={<MaterialCommunityIcons name='arrow-left' />}
                  />
                  <Text alignSelf='center' fontSize='md' color='white'>
                    Expense Reports
                  </Text>
                </HStack>
              }
            />
          ),
        }}
      />
      <Stack.Screen
        name='Expense'
        component={ExpenseCard}
        options={{
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Box mx='auto'>
              <Icon
                color='red.400'
                size='7'
                as={<MaterialCommunityIcons name='gas-station' />}
              />
            </Box>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

// Charts Navigators
const ChartStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: 'blue',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 2,
        },
      }}
    >
      <Stack.Screen
        name='Chart Tables'
        component={ChartedData}
        options={{
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Box mx='auto'>
              <Icon
                color='green.300'
                size='7'
                as={<MaterialCommunityIcons name='chart-bar-stacked' />}
              />
            </Box>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export {
  SettingsStackNavigator,
  HomeStackNavigator,
  AccountStackNavigator,
  LoadStackNavigator,
  ExpenseStackNavigator,
  ChartStackNavigator,
};
