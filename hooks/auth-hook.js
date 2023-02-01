import { useState, useCallback, useEffect } from 'react';
import Purchases from 'react-native-purchases';
import * as SecureStore from 'expo-secure-store';

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [username, setUsername] = useState(false);
  const [userid, setUserid] = useState(false);
  const [subscription, setSubStatues] = useState(false);

  useEffect(() => {
    const checkInfo = async () => {
      try {
        const customerInfo = await Purchases.getCustomerInfo();
        if (typeof customerInfo.entitlements.active.Pro !== 'undefined') {
          // Grant user "pro" access
          setSubStatues(true);
        } else {
          setSubStatues(false);
        }
        // access latest purchaserInfo
      } catch (e) {
        // Error fetching purchaser info
        console.log(e.message);
      }
    };
    checkInfo();
  }, []);

  const login = useCallback(
    (username, token, expirationDate, userid, subscription) => {
      setToken(token);
      setUsername(username);
      setUserid(userid);
      setSubStatues(subscription);
      const tokenExpirationDate = new Date(
        new Date().getTime() + 1000 * 60 * 60 * 730
      );
      setTokenExpirationDate(tokenExpirationDate);
      SecureStore.setItemAsync(
        'user',
        JSON.stringify({
          username: username,
          token: token,
          expiration: tokenExpirationDate.toISOString(),
          userid: userid,
          subscription: subscription,
        })
      );
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUsername(null);
    SecureStore.deleteItemAsync('user');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = SecureStore.getItemAsync('user');

    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date() &&
      storedData.userid
    ) {
      login(
        storedData.username,
        storedData.token,
        new Date(storedData.expiration),
        storedData.userid
      );
    }
  }, [login]);

  return { token, login, logout, username, userid, subscription };
};
