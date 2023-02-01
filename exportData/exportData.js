import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as Permissions from 'expo-permissions';
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Button, Box, Text, Heading, VStack } from 'native-base';

const ExportFiles = () => {
  const [Loads] = useSelector((state) => state.details.loads);
  const [Expenses] = useSelector((state) => state.details.expenses);
  const [header, setheader] = useState('');
  const [header2, setheader2] = useState('');

  const GenerateExcel = (data) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, 'Razor Dispatch', true);

    const base64 = XLSX.write(wb, { type: 'base64' });
    const fileName = FileSystem.documentDirectory + `Rdispatch.xlsx`;
    FileSystem.writeAsStringAsync(fileName, base64, {
      encoding: FileSystem.EncodingType.Base64,
    }).then(() => {
      Sharing.shareAsync(fileName);
    });
  };

  const LoadGenerator = () => {
    if (Loads) {
      const loads = Loads.map((load) => {
        return {
          'Origin': load.Origin,
          'Destination': load.Destination,
          'TotalMiles': load.TotalMiles,
          'PricePerMile': load.PricePerMile,
          'TotalPrice': load.TotalPrice,
          'Date Submitted': new Date(load.createdAt).toLocaleDateString(
            'en-US'
          ),
        };
      });
      return (
        <>
          <Heading>{header}</Heading>
          <Button
            onPress={
              Loads
                ? () => GenerateExcel(loads)
                : setheader('no loads to export')
            }
            colorScheme='green'
            shadow={2}
          >
            <Text>Export Loads</Text>
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Heading p={3} size='xs' color='red.500'>
            {header}
          </Heading>
          <Button
            onPress={() => setheader('no loads to export')}
            colorScheme='green'
            shadow={2}
          >
            <Text>Export Loads</Text>
          </Button>
        </>
      );
    }
  };

  const ExpenseGenerator = () => {
    if (Expenses) {
      const expenses = Expenses.map((expense) => {
        const Totals = parseFloat(
          parseFloat(expense.Misc) +
            parseFloat(expense.Repairs) +
            parseFloat(expense.RoomAndBoard) +
            parseFloat(expense.fuelPrice)
        ).toFixed(2);
        return {
          'Fuel': expense.fuelPrice,
          'Repairs': expense.Repairs,
          'RoomAndBoard': expense.RoomAndBoard,
          'Misc': expense.Misc,
          'TotalPrice': Totals,
          'Date Submitted': new Date(expense.createdAt).toLocaleDateString(
            'en-US'
          ),
        };
      });
      return (
        <>
          <Heading>{header2}</Heading>
          <Button
            onPress={
              Expenses
                ? () => GenerateExcel(expenses)
                : setheader2('no expenses to export')
            }
            colorScheme='red'
            shadow={2}
          >
            <Text>Export Expenses</Text>
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Heading p={3} size='xs' color='red.500'>
            {header2}
          </Heading>
          <Button
            onPress={() => setheader2('no expenses to export')}
            colorScheme='red'
            shadow={2}
          >
            <Text>Export Expenses</Text>
          </Button>
        </>
      );
    }
  };

  return (
    <Box flex={1} justifyContent='center'>
      <Box alignItems='center'>
        <VStack space={1}>
          <LoadGenerator />
          <ExpenseGenerator />
        </VStack>
      </Box>
    </Box>
  );
};

export default ExportFiles;
