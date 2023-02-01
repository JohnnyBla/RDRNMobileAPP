import React, { useState, useCallback } from 'react';
import { passExpenseData } from '../redux/passLoad';
import {
  ScrollView,
  Box,
  Icon,
  Button,
  VStack,
  Text,
  HStack,
  Link,
  IconButton,
} from 'native-base';
import TouchableScale from 'react-native-touchable-scale';
import { RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ExpenseReports = ({ navigation }) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const Gradient = {
    linearGradient: {
      colors: ['red.100', 'blue.100'],
      start: [0, 0],
      end: [1, 0],
    },
  };

  const [ExpenseData] = useSelector((state) => state.details.expenses);

  const OnPressHandler = (props) => {
    const data = { ...props.data };
    dispatch(passExpenseData(data));
    navigation.navigate('Expense');
  };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, [ExpenseData]);

  const Data = () => {
    return (
      <>
        {ExpenseData.map((data, Totals) => {
          {
            Totals = parseFloat(
              parseFloat(data.Misc) +
                parseFloat(data.Repairs) +
                parseFloat(data.RoomAndBoard) +
                parseFloat(data.fuelPrice)
            ).toFixed(2);
          }
          return (
            <ListItem
              Component={TouchableScale}
              onPress={() => OnPressHandler({ data, Totals })}
              friction={100}
              tenesion={100}
              key={data._id}
              containerStyle={{ borderRadius: 5, margin: 4 }}
              linearGradientProps={{
                colors: ['white', '#fc3852'],
                start: [1, 0],
                end: [0, 1],
              }}
              ViewComponent={LinearGradient}
            >
              <ListItem.Content alignItems='center'>
                <ListItem.Title
                  style={{
                    color: 'blue',
                    fontWeight: 'bold',
                    letterSpacing: 2,
                    textAlign: 'center',
                  }}
                >
                  Total Expense Amount:
                </ListItem.Title>
                <ListItem.Subtitle
                  style={{
                    letterSpacing: 3,
                    textAlign: 'center',
                    color: 'green',
                  }}
                >
                  ${Totals}
                </ListItem.Subtitle>
              </ListItem.Content>
              <Icon
                as={MaterialCommunityIcons}
                size='6'
                name='plus'
                _dark={{
                  color: 'warmGray.50',
                }}
                color='black'
              />
            </ListItem>
          );
        })}
      </>
    );
  };

  if (ExpenseData) {
    return (
      <Box flex={1} bg={Gradient}>
        <ScrollView
          flex={1}
          p={1}
          pt={4}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Data />
          <Box mt={5}>
            <VStack space={1} alignItems='center'>
              <Text textAlign='center' color='muted.400'>
                Drag Down to Refresh
              </Text>
              <Icon
                as={MaterialCommunityIcons}
                size='6'
                name='chevron-double-down'
                _dark={{
                  color: 'warmGray.50',
                }}
                color='muted.400'
              />
            </VStack>
          </Box>
        </ScrollView>
      </Box>
    );
  } else {
    return (
      <Box flex={1} justifyContent='center' bg={Gradient}>
        <Box>
          <Button variant='ghost' isLoading size='lg'>
            Button
          </Button>
          <HStack alignSelf='center'>
            <Link
              alignSelf='center'
              onPress={() => {
                navigation.navigate('Submit Expense');
              }}
              _text={{ color: 'blue.400' }}
            >
              Submit Expenses To get Started
            </Link>
            <IconButton
              alignSelf='center'
              variant='unstyled'
              _focus={{
                borderWidth: 0,
              }}
              icon={
                <Icon
                  as={MaterialCommunityIcons}
                  name='plus'
                  size='6'
                  color='red.600'
                />
              }
              onPress={() => {
                navigation.navigate('Submit Expense');
              }}
            />
          </HStack>
        </Box>
      </Box>
    );
  }
};

export default ExpenseReports;
