import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {Input, Button} from 'react-native-elements';

import firestore from '@react-native-firebase/firestore';

const AddProduct = ({navigation}) => {
  const [productName, setProductName] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();

  const onChangeproductName = (productName) => {
    setProductName(productName);
  };

  const onChangeQuantity = (quantity) => {
    setQuantity(quantity);
  };

  const onChangePrice = (price) => {
    setPrice(price);
  };

  const handleAddProduct = () => {
    firestore()
      .collection('products')
      .add({
        productName: productName,
        quantity: quantity,
        price: price,
      })
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id);
        alert('Product successfully added');
        navigation.navigate('ViewProducts');
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
        alert(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Add New Product</Text>
      <Input
        placeholder="Product Name"
        onChangeText={(productName) => onChangeproductName(productName)}
      />
      <Input
        placeholder="Quantity"
        onChangeText={(quantity) => onChangeQuantity(quantity)}
      />
      <Input
        placeholder="Price"
        onChangeText={(price) => onChangePrice(price)}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
        <Text>Add Product</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#fd5c63',
    width: '50%',
    padding: 10,
  },
});

export default AddProduct;
