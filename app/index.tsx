import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from 'react-native';

const baseUrl = "http://192.168.81.208:8080/api/v1/customer";

export default function Index() {
  const [customerId, setCustomerId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerSalary, setCustomerSalary] = useState('');
  const [customers, setCustomers] = useState([]);

  const handleSaveCustomer = async () => {
    const customer = {
      id: customerId,
      name: customerName,
      address: customerAddress,
      salary: customerSalary
    };

    try {
      await axios.post(`${baseUrl}/saveCustomer`, customer, {
        headers: { 'Content-Type': 'application/json' }
      });
      Alert.alert('Success', 'Customer Saved Successfully!');
      loadAllCustomers();
    } catch (error) {
      Alert.alert('Error', 'Customer Save Error!');
    }
  };

  const handleSearchCustomer = async () => {
    try {
      const response = await axios.get(`${baseUrl}/searchCustomer/${customerId}`);
      setCustomerName(response.data.name);
      setCustomerAddress(response.data.address);
      setCustomerSalary(response.data.salary);
    } catch (error) {
      Alert.alert('Error', 'Customer Search Error!');
    }
  };

  const handleUpdateCustomer = async () => {
    const customer = {
      id: customerId,
      name: customerName,
      address: customerAddress,
      salary: customerSalary
    };

    try {
      await axios.put(`${baseUrl}/updateCustomer`, customer, {
        headers: { 'Content-Type': 'application/json' }
      });
      Alert.alert('Success', 'Customer Updated Successfully!');
      loadAllCustomers();
    } catch (error) {
      Alert.alert('Error', 'Customer Update Error!');
    }
  };

  const handleDeleteCustomer = async () => {
    try {
      await axios.delete(`${baseUrl}/deleteCustomer/${customerId}`);
      Alert.alert('Success', 'Customer Deleted Successfully!');
      loadAllCustomers();
    } catch (error) {
      Alert.alert('Error', 'Customer Delete Error!');
    }
  };

  const loadAllCustomers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/loadAllCustomers`);
      setCustomers(response.data);
    } catch (error) {
      Alert.alert('Error', 'Load All Customers Error!');
    }
  };

  useEffect(() => {
    loadAllCustomers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Management</Text>
      <TextInput
        style={styles.input}
        value={customerId}
        onChangeText={setCustomerId}
        placeholder="Customer ID"
      />
      <TextInput
        style={styles.input}
        value={customerName}
        onChangeText={setCustomerName}
        placeholder="Customer Name"
      />
      <TextInput
        style={styles.input}
        value={customerAddress}
        onChangeText={setCustomerAddress}
        placeholder="Customer Address"
      />
      <TextInput
        style={styles.input}
        value={customerSalary}
        onChangeText={setCustomerSalary}
        placeholder="Customer Salary"
      />
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSaveCustomer} />
        <Button title="Search" onPress={handleSearchCustomer} />
        <Button title="Update" onPress={handleUpdateCustomer} />
        <Button title="Delete" onPress={handleDeleteCustomer} />
        <Button title="Load All" onPress={loadAllCustomers} />
      </View>
      <FlatList
        data={customers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.id}</Text>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.address}</Text>
            <Text style={styles.cell}>{item.salary}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});
