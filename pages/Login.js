import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {Input, Button} from 'react-native-elements';
import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onChangeEmail = (email) => {
    setEmail(email);
  };

  const onChangePassword = (password) => {
    setPassword(password);
  };

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((resp) => {
        console.log(resp);
        alert('Login successfully');
        navigation.navigate('ViewProducts');
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        alert(errorMessage);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <AntIcon name={'skin'} size={60} />
      <Text>LOGIN</Text>
      <Input
        placeholder="Email"
        onChangeText={(email) => onChangeEmail(email)}
      />
      <Input
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(password) => onChangePassword(password)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
      <Text onPress={() => navigation.navigate('Signup')}>
        Dont have an account? Register here
      </Text>
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

export default Login;
