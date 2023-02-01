import React from 'react';
import { Box, HStack, IconButton, Link, Icon } from 'native-base';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ExpenseCharts = () => {
  const nav = useNavigation();
  const [Expenses] = useSelector((state) => state.details.expenses);
  if (Expenses) {
    const Fuel = Expenses.map((items) => items.fuelPrice).reduce(
      (cv, rv) => cv + rv,
      0
    );
    const RoomB = Expenses.map((items) => items.RoomAndBoard).reduce(
      (cv, rv) => cv + rv,
      0
    );
    const Misc = Expenses.map((items) => items.Misc).reduce(
      (cv, rv) => cv + rv,
      0
    );
    const Repairs = Expenses.map((items) => items.Repairs).reduce(
      (cv, rv) => cv + rv,
      0
    );

    return (
      <Box>
        <BarChart
          data={{
            labels: ['$Fuel', '$Room&B', '$Misc', '$Repairs'],
            datasets: [
              {
                data: [
                  parseFloat(Fuel).toFixed(2),
                  parseFloat(RoomB).toFixed(2),
                  parseFloat(Misc).toFixed(2),
                  parseFloat(Repairs).toFixed(2),
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width - 15} // from react-native
          withInnerLines={true}
          height={220}
          yAxisLabel='$'
          showValuesOnTopOfBars={true}
          yAxisInterval={10} // optional, defaults to 1
          chartConfig={{
            barPercentage: 1.5,
            backgroundColor: '#e26a00',
            backgroundGradientFrom: 'blue',
            backgroundGradientTo: 'red',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          style={{
            marginVertical: 8,
            borderRadius: 10,
          }}
        />
      </Box>
    );
  } else {
    return (
      <Box flex={1} justifyContent='center'>
        <Box>
          <HStack alignSelf='center'>
            <Link
              alignSelf='center'
              onPress={() => {
                nav.navigate('Account View');
              }}
              _text={{ color: 'blue.400' }}
            >
              Submit Expenses To get Started
            </Link>
          </HStack>
        </Box>
      </Box>
    );
  }
};

export default ExpenseCharts;
