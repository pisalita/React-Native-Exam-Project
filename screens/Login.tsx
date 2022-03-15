import {
  Button,
  Image,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { login } from "../features/User";
import { useNavigation } from "@react-navigation/native";
import { LoginStackParamList } from "../types/LoginStackParamList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CustomButton from "../components/CustomButton";

type ScreenNavigationType = NativeStackNavigationProp<
  LoginStackParamList,
  "LoginScreen"
>;

const Login = () => {
  const navigation = useNavigation<ScreenNavigationType>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const combinedOnChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const value = e.nativeEvent.text;
    setter(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("../logo.png")} />
      <TextInput
        value={email}
        onChange={(e) => {
          combinedOnChange(setEmail, e);
        }}
        placeholder="email"
      />
      <TextInput
        secureTextEntry={true}
        value={password}
        onChange={(e) => {
          combinedOnChange(setPassword, e);
        }}
        placeholder="password"
      />
      <CustomButton
        title="Login"
        onPress={() => {
          if (email && password !== "") {
            dispatch(login({ email, password }));
          }
        }}
      />
      <Button
        title="Create User"
        onPress={() => navigation.navigate("CreateUserScreen")}
      />
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 14,
  },
  logo: {
    margin: 20,
    width: 114,
    height: 114,
  },
});
