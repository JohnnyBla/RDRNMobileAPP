import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Box,
  HStack,
  Icon,
  Stagger,
  IconButton,
  useDisclose,
  Text,
} from 'native-base';
import { ListItem } from '@rneui/themed';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import RemoveLoads from './removeLoadsModal';
import RemoveExpenses from './removeExpensesModals';

const AccordionIcons = () => {
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
  const [expanded, setExpanded] = useState(false);
  const [isPressed, setPressed] = useState(false);
  const { isOpen, onToggle } = useDisclose();
  const navigation = useNavigation();

  return (
    <Box marginTop={3} paddingBottom={3}>
      <Box
        style={{
          padding: 4,
        }}
      >
        <ListItem.Accordion
          containerStyle={{
            backgroundColor: 'transparent',
          }}
          content={
            <Box
              alignItems='center'
              flexDirection='row'
              shadow={isPressed === false ? 5 : 0}
              rounded='lg'
              bg={isPressed === false ? Gradient : PressGradient}

              // style={{ borderWidth: 1, borderColor: 'blue', borderRadius: 10 }}
            >
              <ListItem.Content alignItems='center' style={{ padding: 5 }}>
                <ListItem.Title>
                  <HStack p='1'>
                    <Icon
                      as={MaterialIcons}
                      name='search'
                      color='primary.900'
                      size={30}
                    />
                    <Text alignSelf='center' mx='2'>
                      Quick Links
                    </Text>
                  </HStack>
                </ListItem.Title>
              </ListItem.Content>
            </Box>
          }
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
            setPressed(!isPressed);
            onToggle(!isOpen);
          }}
        >
          <Box minH='220' maxW='100%'>
            <Stagger
              visible={isOpen}
              initial={{
                opacity: 0,
                scale: 0,
                translateY: 34,
              }}
              animate={{
                translateY: 0,
                scale: 1,
                opacity: 1,
                transition: {
                  type: 'spring',
                  mass: 0.8,
                  stagger: {
                    offset: 30,
                    reverse: true,
                  },
                },
              }}
              exit={{
                translateY: 34,
                scale: 0.5,
                opacity: 0,
                transition: {
                  duration: 100,
                  stagger: {
                    offset: 30,
                    reverse: true,
                  },
                },
              }}
            >
              <IconButton
                mb='4'
                variant='solid'
                bg='indigo.400'
                colorScheme='indigo'
                borderRadius='full'
                onPress={() =>
                  navigation.navigate('Loads', { screen: 'Submit Load' })
                }
                shadow={5}
                icon={
                  <HStack>
                    <Icon
                      as={MaterialCommunityIcons}
                      size='6'
                      name='plus'
                      _dark={{
                        color: 'warmGray.50',
                      }}
                      color='warmGray.50'
                    />
                    <Text alignSelf='center' mx='2'>
                      Add Loads
                    </Text>
                  </HStack>
                }
              />
              <RemoveLoads />

              <IconButton
                mb='4'
                variant='solid'
                bg='teal.400'
                colorScheme='teal'
                borderRadius='full'
                shadow={5}
                onPress={() =>
                  navigation.navigate('Expenses', { screen: 'Submit Expense' })
                }
                icon={
                  <HStack>
                    <Icon
                      as={MaterialCommunityIcons}
                      _dark={{
                        color: 'warmGray.50',
                      }}
                      size='6'
                      name='plus'
                      color='warmGray.50'
                    />
                    <Text alignSelf='center' mx='2'>
                      Add Expense
                    </Text>
                  </HStack>
                }
              />
              <RemoveExpenses />

              <IconButton
                mb='4'
                variant='solid'
                bg='green.400'
                onPress={() => navigation.navigate({ name: 'Charts' })}
                colorScheme='green'
                borderRadius='full'
                shadow={5}
                icon={
                  <HStack>
                    <Icon
                      as={MaterialCommunityIcons}
                      _dark={{
                        color: 'warmGray.50',
                      }}
                      size='6'
                      name='chart-bar-stacked'
                      color='warmGray.50'
                    />
                    <Text alignSelf='center' mx='2'>
                      View Charts
                    </Text>
                  </HStack>
                }
              />
              <IconButton
                mb='4'
                variant='solid'
                bg='orange.400'
                colorScheme='orange'
                borderRadius='full'
                shadow={5}
                onPress={() => navigation.navigate('Export Files')}
                icon={
                  <HStack>
                    <Icon
                      as={MaterialCommunityIcons}
                      _dark={{
                        color: 'warmGray.50',
                      }}
                      size='6'
                      name='file-export'
                      color='warmGray.50'
                    />
                    <Text alignSelf='center' mx='2'>
                      Export Data
                    </Text>
                  </HStack>
                }
              />
            </Stagger>
          </Box>
        </ListItem.Accordion>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
  },
  subTitle: {
    textAlign: 'center',
    color: 'black',
  },
  fonts: {
    padding: 2,
  },
  divider: {
    marginBottom: 8,
    marginTop: 6,
    color: 'blue',
  },
});

export default AccordionIcons;
