import React, { useState, useCallback, useEffect } from 'react';
import SignedInPaywall from './signedInPaywall';
import { StyleSheet } from 'react-native';
import { Box, ScrollView } from 'native-base';
import { RefreshControl } from 'react-native';
import { ListItem } from '@rneui/themed';
import { Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Purchases from 'react-native-purchases';
import AccordionIcons from '../shared/AccountAccordion';
import CardTotals from '../shared/CardTotals/totals';

const Account = ({ navigation }) => {
  const [expanded, setExpanded] = useState(true);
  const [isPressed, setPressed] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [subscription, setSubscription] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  useEffect(() => {
    Purchases.getCustomerInfo().then((response) => {
      setSubscription(response.activeSubscriptions);
    });
  }, []);

  const PressGradient = {
    linearGradient: {
      colors: ['lightBlue.300', 'red.800'],
      start: [0, 0],
      end: [1, 0],
    },
  };
  const Gradient = {
    linearGradient: {
      colors: ['white', 'blue.800'],
      start: [0, 0],
      end: [1, 0],
    },
  };
  const CardGradient = {
    linearGradient: {
      colors: ['white', 'grey'],
      start: [0, 0],
      end: [1, 0],
    },
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  if (subscription.length !== 0) {
    return (
      <ScrollView
        style={styles.container}
        _contentContainerStyle={{ marginTop: 2 }}
        bgColor='coolGray.800'
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Box
          style={{
            marginTop: 1,
            padding: 4,
          }}
        >
          <ListItem.Accordion
            containerStyle={{
              backgroundColor: 'transparent',
            }}
            content={
              <Box
                justifyItems='center'
                flexDirection='row'
                shadow={isPressed === false ? 9 : 0}
                rounded='lg'
                bg={isPressed === false ? Gradient : PressGradient}
                _text={{ textAlign: 'center' }}
              >
                <Icon
                  as={MaterialIcons}
                  name='assignment'
                  color='amber.400'
                  size={30}
                  m='4'
                />

                <ListItem.Content>
                  <ListItem.Title>Account Overview</ListItem.Title>
                </ListItem.Content>
              </Box>
            }
            isExpanded={expanded}
            onPress={() => {
              setExpanded(!expanded);
              setPressed(!isPressed);
            }}
          >
            <Box shadow='5' bg={CardGradient} p={4} m={3} rounded='xl'>
              <CardTotals />
            </Box>
          </ListItem.Accordion>
        </Box>
        <AccordionIcons />
      </ScrollView>
    );
  } else {
    return <SignedInPaywall />;
  }
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
export default Account;
