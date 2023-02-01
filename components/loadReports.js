import React from 'react';
import { passLoadData } from '../redux/passLoad';
import { useDispatch } from 'react-redux';
import { Icon } from 'native-base';
import TouchableScale from 'react-native-touchable-scale';
import { ListItem } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LoadReports = ({
  nav,
  Origin,
  TotalPrice,
  _id,
  Destination,
  PricePerMile,
  TotalMiles,
}) => {
  const dispatch = useDispatch();

  const OnPressHandler = (props) => {
    const data = { ...props };
    dispatch(passLoadData(data));
    nav.navigate('Load');
  };

  const Data = () => {
    return (
      <ListItem
        Component={TouchableScale}
        onPress={() =>
          OnPressHandler({
            Origin,
            Destination,
            PricePerMile,
            TotalMiles,
            TotalPrice,
            _id,
          })
        }
        friction={100}
        tenesion={100}
        key={_id}
        containerStyle={{ borderRadius: 5, margin: 4 }}
        linearGradientProps={{
          colors: ['white', '#95f597'],
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
            {Origin}
          </ListItem.Title>
          <ListItem.Subtitle
            style={{
              letterSpacing: 3,
              textAlign: 'center',
              color: 'green',
            }}
          >
            ${parseFloat(TotalPrice).toFixed(2)}
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
  };

  return <Data />;
};

export default LoadReports;
