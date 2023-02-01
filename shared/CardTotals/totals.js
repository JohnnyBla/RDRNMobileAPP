import React, { useContext, useEffect, useState } from 'react';
import { Card } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux';
import { loads, expenses } from '../../redux/getDetails';
import { AuthContext } from '../../context/auth-context';
import { Box, VStack, HStack, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import axios from 'axios';

const CardTotals = () => {
  const TotalLoads = useSelector((state) => state.details.totalLoads);
  const TotalLoadPrice = useSelector((state) => state.details.loadTotalPrice);

  const TotalExpenses = useSelector((state) => state.details.totalExpenses);
  const TotalExpensePrice = useSelector(
    (state) => state.details.expenseTotalPrice
  );

  const auth = useContext(AuthContext);

  const [profit, setProfit] = useState(0);
  const [load, setLoads] = useState(false);

  const usermsg = auth.token;
  const userid = auth.userid;
  const userLoadsUrl = `https://razordispatchback.herokuapp.com/api/loads/user/${userid}`;
  const userExpensesUrl = `https://razordispatchback.herokuapp.com/api/expenses/user/${userid}`;

  const dispatch = useDispatch();

  const getLoad = () => {
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
              dispatch(loads(loadInfo));
            } else {
              console.log('No information');
            }
          } else {
            setLoads({});
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
              dispatch(expenses(expenseInfo));
            } else {
              console.log('No information');
            }
          } else {
            console.log(response);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLoad();
    getExpenses();
  }, [TotalLoads, TotalExpenses]);

  useEffect(() => {
    setProfit(parseFloat(TotalLoadPrice - TotalExpensePrice).toFixed(2));
  });

  return (
    <Card
      justifyContent='center'
      containerStyle={{ backgroundColor: 'transparent' }}
      wrapperStyle={{ marginBottom: 2, backgroundColor: 'transparent' }}
    >
      <Card.Title style={{ marginBottom: 1, textTransform: 'capitalize' }}>
        {auth.username}
      </Card.Title>

      <Card.Title>Welcome to Your Account Overview</Card.Title>
      <Card.FeaturedSubtitle style={styles.subTitle}>
        Summary
      </Card.FeaturedSubtitle>
      <Card.Divider style={styles.divider} />
      <Box>
        <VStack justifyContent='space-around' space={3}>
          <HStack justifyContent='space-between'>
            <Text style={styles.LoadFonts}>Load Reports</Text>
            <Text style={styles.LoadFonts}>
              {TotalLoadPrice != 0 ? `$${TotalLoadPrice}` : `$0.00`}
            </Text>
          </HStack>
          <HStack justifyContent='space-between'>
            <Text style={styles.ExpenseFonts}>Expense Reports</Text>
            <Text style={styles.ExpenseFonts}>
              {' '}
              {TotalExpensePrice != 0 ? `$${TotalExpensePrice}` : `$0.00`}
            </Text>
          </HStack>
        </VStack>
      </Box>
      <Card.Divider style={styles.divider} />
      <Box style={{ marginTop: 4 }}>
        <VStack justifyContent='space-around' space={3}>
          <HStack justifyContent='space-between'>
            <Text style={styles.LoadFonts}>Total Loads</Text>
            <Text style={styles.LoadFonts}>
              {' '}
              {TotalLoads != 0 ? TotalLoads : 0}
            </Text>
          </HStack>
          <HStack justifyContent='space-between'>
            <Text style={styles.ExpenseFonts}>Total Expenses</Text>
            <Text style={styles.ExpenseFonts}>
              {' '}
              {TotalExpenses != 0 ? TotalExpenses : 0}
            </Text>
          </HStack>
        </VStack>
      </Box>
      <Card.Divider style={styles.divider} />
      <Box mt={4} alignItems='center'>
        <HStack justifyContent='space-between'>
          <Text
            color={profit >= 0 ? 'green.700' : 'red.700'}
            alignSelf='center'
            textTransform='uppercase'
          >
            {profit >= 0 ? 'Profit:' : 'Loss:'}
          </Text>
          <Text
            color={profit >= 0 ? 'green.700' : 'red.700'}
            alignSelf='center'
          >
            {' '}
            {profit != 0 ? `$${profit}` : 0}
          </Text>
        </HStack>
      </Box>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subTitle: {
    textAlign: 'center',
    color: 'blue',
  },
  LoadFonts: {
    padding: 2,
    color: 'green',
  },
  ExpenseFonts: {
    padding: 2,
    color: 'red',
  },
  divider: {
    marginBottom: 8,
    marginTop: 6,
    color: 'blue',
  },
});

export default CardTotals;
