import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {Input, Button} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';

const AddProduct = ({navigation, route}) => {
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

  const handleUpdateProduct = () => {
    let db = firestore().collection('products');

    db.doc(route.params.product.id)
      .update({
        productName: productName,
        quantity: quantity,
        price: price,
      })
      .then(function (docRef) {
        alert('Product successfully updated');
        navigation.navigate('ViewProducts');
      })
      .catch(function (error) {
        alert(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Update Product</Text>
      <Input
        placeholder={route.params.product.productName}
        onChangeText={(productName) => onChangeproductName(productName)}
      />
      <Input
        placeholder={route.params.product.quantity}
        onChangeText={(quantity) => onChangeQuantity(quantity)}
      />
      <Input
        placeholder={route.params.product.price}
        onChangeText={(price) => onChangePrice(price)}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdateProduct}>
        <Text>Update Product</Text>
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
