import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userid: null,
  token: null,
  username: null,
  subscription: false,
  login: () => {},
  logout: () => {},
});
