import React from 'react';
import { Box, Text } from 'native-base';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const TotalCompareChart = (props) => {
  const loads = props.loads;
  const expenses = props.expenses;
  let loosedata = {
    loadTotal: 0,
    expenseTotal: 0,
  };

  if (loads.length >= 1) {
    const LoadTotals = loads
      .map((items) => items.TotalPrice)
      .reduce((cv, rv) => cv + rv, 0);
    const Prices = expenses
      .map(
        (expense) =>
          expense.Misc +
          expense.Repairs +
          expense.RoomAndBoard +
          expense.fuelPrice
      )
      .reduce((cv, pv) => cv + pv, 0);

    loosedata = {
      loadTotal: parseFloat(LoadTotals).toFixed(2),
      expenseTotal: parseFloat(Prices).toFixed(2),
    };
    return (
      <Box>
        <BarChart
          data={{
            labels: ['$TotalExpenses', '$TotalEarned'],
            datasets: [
              {
                data: [loosedata.expenseTotal, loosedata.loadTotal],
              },
            ],
          }}
          width={Dimensions.get('window').width - 15} // from react-native
          height={220}
          yAxisLabel='$'
          fromZero={true}
          showBarTops={true}
          showValuesOnTopOfBars={true}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: 'orange',
            backgroundGradientTo: 'violet',
            backgroundGradientFromOpacity: 1,
            decimalPlaces: 0, // optional, defaults to 2dp
            barPercentage: 2,
            strokeWidth: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
      <Box flex={1} alignContent='center'>
        <Text alignSelf='center' textAlign='center' p={2}>
          Not enough data to display chart need at least one{' '}
          <Text color='green.600' textTransform='uppercase' fontWeight='bold'>
            Load{' '}
          </Text>
          and one{' '}
          <Text color='red.600' textTransform='uppercase' fontWeight='bold'>
            expense
          </Text>{' '}
          to compare
        </Text>
      </Box>
    );
  }
};

export default TotalCompareChart;
