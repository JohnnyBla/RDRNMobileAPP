import React, { useEffect } from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { StatusBar, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomNav from './Navigator/bottomNav';
import { Provider } from 'react-redux';
import { store } from './redux/configureStore';
import { AuthContext } from './context/auth-context';
import { useAuth } from './hooks/auth-hook';
import { RevenueCatGoogle } from './Variables/env';
import Purchases from 'react-native-purchases';

export default function App() {
  const LinearGradient = require('expo-linear-gradient').LinearGradient;
  useEffect(() => {
    Purchases.setDebugLogsEnabled(true);
    Purchases.configure({ apiKey: RevenueCatGoogle });

    const getPackages = async () => {
      try {
        if (Platform.OS === 'ios') {
          //   Purchases.setup('ios_Api');
        } else {
          Purchases.configure({ apiKey: RevenueCatGoogle });
        }
      } catch (e) {
        Alert.alert(`Error getting offers`, e.message);
      }
    };
    getPackages().catch((e) => console.log(e));
  }, []);
  const { token, login, logout, username, userid, subscription } = useAuth();

  const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: '#E3F2F9',
        100: '#C5E4F3',
        200: '#A2D4EC',
        300: '#7AC1E4',
        400: '#47A9DA',
        500: '#0088CC',
        600: '#007AB8',
        700: '#006BA1',
        800: '#005885',
        900: '#003F5E',
      },
      // Redefining only one shade, rest of the color will remain same.
      amber: {
        400: '#d97706',
      },
      logo: {
        100: '#8f6d19',
        200: '#17ffff',
        300: '#17a3c9',
      },
    },
    config: {
      dependencies: {
        'linear-gradient': LinearGradient,
      },
    },
  });
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
        username: username,
        userid: userid,
        subscription: subscription,
      }}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />

        <Provider store={store}>
          <NavigationContainer>
            <NativeBaseProvider theme={theme} config={theme.config}>
              <BottomNav />
            </NativeBaseProvider>
          </NavigationContainer>
        </Provider>
      </SafeAreaView>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
