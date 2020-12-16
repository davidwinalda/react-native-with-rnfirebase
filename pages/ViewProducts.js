import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, Button} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';

const ViewProducts = ({navigation}) => {
  const [data, setData] = useState();

  useEffect(() => {
    firestore()
      .collection('products')
      .onSnapshot((snapshot) => {
        const listProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(listProducts);
      });
  }, []);

  let deleteData = firestore().collection('products');

  const deleteProduct = (key) => {
    deleteData
      .doc(key)
      .delete()
      .then(() => {
        alert('Product successfully deleted');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(data);
  return (
    <SafeAreaView style={styles.container}>
      <Text h3>ViewProducts</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => {
          return (
            <View style={styles.wrapper}>
              <View style={styles.product}>
                <View>
                  <Text>{item.productName}</Text>
                  <Text>{item.quantity}</Text>
                </View>
                <View>
                  <Text>{item.price}</Text>
                </View>
              </View>
              <View style={styles.action}>
                <Button
                  title="Ubah"
                  type="outline"
                  onPress={() =>
                    navigation.navigate('UpdateProduct', {product: item})
                  }
                />
                <Button
                  title="Hapus"
                  type="outline"
                  onPress={() => deleteProduct(item.id)}
                />
              </View>
            </View>
          );
        }}
      />
      <Button
        title="Add Product"
        onPress={() => navigation.navigate('AddProduct')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
  },
  product: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  action: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: {
    borderWidth: 1,
    borderColor: '#2e2e2e',
    padding: 20,
  },
});

export default ViewProducts;
