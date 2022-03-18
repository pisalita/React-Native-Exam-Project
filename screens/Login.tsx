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
import CustomInputField from "../components/CustomInputfield";

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
      <Text>Log in</Text>

      <View style={[styles.inputfieldContainer, styles.shadow]}>
        <CustomInputField
          label="E-MAIL"
          value={email}
          secureTextEntry={false}
          onChange={(e) => {
            combinedOnChange(setEmail, e);
          }}
          borderBottom={true}
        />
        <CustomInputField
          label="PASSWORD"
          value={password}
          secureTextEntry={true}
          onChange={(e) => {
            combinedOnChange(setPassword, e);
          }}
        />
      </View>

      <CustomButton
        title="Login"
        onPress={() => {
          if (email && password !== "") {
            dispatch(login({ email, password }));
          }
        }}
      />
      <Text>
        Don't have an account?
        <Text onPress={() => navigation.navigate("CreateUserScreen")}>
          Sign up
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    margin: 20,
    width: 114,
    height: 114,
  },
  inputfieldContainer: {
    alignSelf: "stretch",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#EEEEEE",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
