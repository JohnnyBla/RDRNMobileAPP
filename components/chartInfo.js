import React, { useState, useContext, useEffect, useCallback } from 'react';
import { ScrollView, Text, Box, VStack } from 'native-base';
import { RefreshControl } from 'react-native';
import SignedInPaywall from './signedInPaywall';
import ExpenseCharts from '../shared/expenseCharts';
import LoadCharts from '../shared/loadCharts';
import { AuthContext } from '../context/auth-context';
import TotalCompareChart from '../shared/TotalCompare';
import { useSelector } from 'react-redux';
import Purchases from 'react-native-purchases';
import axios from 'axios';

const ChartedData = ({ navigation }) => {
  const auth = useContext(AuthContext);

  const [loads, setLoads] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const TotalLoads = useSelector((state) => state.details.totalLoads);
  const TotalExpenses = useSelector((state) => state.details.totalExpenses);
  const [refreshing, setRefreshing] = useState(false);
  const [subscription, setSubscription] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, [loads]);
  useEffect(() => {
    Purchases.getCustomerInfo().then((response) => {
      setSubscription(response.activeSubscriptions);
    });
  }, [loads]);

  const usermsg = auth.token;
  const userid = auth.userid;
  const userLoadsUrl = `https://razordispatchback.herokuapp.com/api/loads/user/${userid}`;
  const userExpensesUrl = `https://razordispatchback.herokuapp.com/api/expenses/user/${userid}`;

  const getLoads = () => {
    try {
      axios({
        method: 'GET',
        url: userLoadsUrl,
        headers: {
          Authorization: 'Bearer ' + usermsg,
          'Content-Type': 'application/json',
        },
      })
        .catch((error) => console.log(error))
        .then((response) => {
          if (response.status === 200) {
            const loadInfo = response.data;
            if (loadInfo) {
              setLoads(loadInfo);
            } else {
              console.log('No information');
            }
          } else {
            setLoads(0);
          }
        })
        .catch((err) => {
          setLoads([]);
          console.log(err);
        });
    } catch (err) {
      throw err;
    }
  };

  const getExpenses = () => {
    try {
      axios({
        method: 'GET',
        url: userExpensesUrl,
        headers: {
          Authorization: 'Bearer ' + usermsg,
          'Content-Type': 'application/json',
        },
      })
        .catch((error) => console.log(error))
        .then((response) => {
          if (response.status === 200) {
            const expenseInfo = response.data;
            if (expenseInfo) {
              setExpenses(expenseInfo);
            } else {
              console.log('No information');
            }
          } else {
            console.log(response);
          }
        })
        .catch((err) => {
          setExpenses([]);
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getExpenses();
    getLoads();
  }, [TotalLoads, TotalExpenses]);

  if (subscription.length !== 0) {
    return (
      <ScrollView
        flex={1}
        bgColor={'coolGray.100'}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <VStack mb={8} space={4}>
          <VStack mt={8}>
            <Text
              alignSelf='center'
              style={{
                color: 'green',
                fontWeight: 'bold',
              }}
            >
              Load Reports
            </Text>
            <Box p={2}>
              <LoadCharts loads={loads} nav={navigation} />
            </Box>
          </VStack>
          <VStack>
            <Text
              mt={5}
              alignSelf='center'
              style={{ color: 'red', fontWeight: 'bold' }}
            >
              Expense Reports
            </Text>
            <Box p={2}>
              <ExpenseCharts expenses={expenses} nav={navigation} />
            </Box>
          </VStack>
          <VStack>
            <Text
              mt={5}
              alignSelf='center'
              style={{ color: 'blue', fontWeight: 'bold' }}
            >
              Compared Totals
            </Text>
            <Box p={2}>
              <TotalCompareChart loads={loads} expenses={expenses} />
            </Box>
          </VStack>
        </VStack>
      </ScrollView>
    );
  } else {
    return <SignedInPaywall />;
  }
};

export default ChartedData;
