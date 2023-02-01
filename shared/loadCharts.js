import React from 'react';
import { Box, HStack, IconButton, Link, Icon } from 'native-base';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoadCharts = (props) => {
  const loadData = props.loads;
  const nav = useNavigation();
  let loosedata = {
    dataTotal: 0,
    dataPPM: 0,
    dataTotalPrice: 0,
  };

  if (loadData.length >= 1) {
    const TotalMiles = loadData
      .map((items) => items.TotalMiles)
      .reduce((cv, rv) => cv + rv, 0);
    const TotalPPM = loadData
      .map((items) => items.PricePerMile)
      .reduce((cv, rv) => cv + rv, 0);
    const Totals = loadData
      .map((items) => items.TotalPrice)
      .reduce((cv, rv) => cv + rv, 0);
    const TotalPPMAVG = parseFloat(TotalPPM / loadData.length).toFixed(2);

    loosedata = {
      dataTotal: parseFloat(TotalMiles).toFixed(2),
      dataPPM: parseFloat(TotalPPMAVG).toFixed(2),
      dataTotalPrice: parseFloat(Totals).toFixed(2),
    };
    return (
      <Box>
        <BarChart
          data={{
            labels: ['TotalMiles', '$TotalPPM(avg)', '$TotalEarned'],
            datasets: [
              {
                data: [
                  loosedata.dataTotal,
                  loosedata.dataPPM,
                  loosedata.dataTotalPrice,
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width - 15} // from react-native
          height={220}
          fromZero={true}
          showValuesOnTopOfBars={true}
          yAxisInterval={10} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: 'green',
            backgroundGradientTo: 'blue',
            backgroundGradientFromOpacity: 1,

            barPercentage: 1.5,
            strokeWidth: 2,
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
              Submit Loads To get Started
            </Link>
          </HStack>
        </Box>
      </Box>
    );
  }
};

export default LoadCharts;
