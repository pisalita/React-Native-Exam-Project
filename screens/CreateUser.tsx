import {
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Button,
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
} from "react-native";
import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { createUser } from "../features/User";
import CustomButton from "../components/CustomButton";
import CustomInputfield from "../components/CustomInputfield";

const CreateUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
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
      <Text style={styles.title}>Create user</Text>

      <View style={[styles.inputfieldContainer, styles.shadow]}>
        <CustomInputfield
          label="E-MAIL"
          value={email}
          secureTextEntry={false}
          onChange={(e) => {
            combinedOnChange(setEmail, e);
          }}
          errorText="Please enter an e-mail"
          borderBottom={true}
        />
        <CustomInputfield
          label="PASSWORD"
          value={password}
          secureTextEntry={true}
          onChange={(e) => {
            combinedOnChange(setPassword, e);
          }}
          errorText="Please enter a password"
          borderBottom={true}
        />
        <CustomInputfield
          label="PASSWORD"
          value={password2}
          secureTextEntry={true}
          onChange={(e) => {
            combinedOnChange(setPassword2, e);
          }}
          errorText="Please enter a password"
        />
        {password !== password2 && (
          <Text style={styles.passwordMatch}>
            {" "}
            <Image
              style={styles.errorIcon}
              source={require("../errorIcon.png")}
            />
            {"   "}
            Passwords don't match{" "}
          </Text>
        )}
      </View>

      <CustomButton
        title="Create user"
        onPress={() => {
          if (email && password !== "" && password === password2) {
            dispatch(createUser({ email, password }));
          }
        }}
      />
    </SafeAreaView>
  );
};

export default CreateUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 10,
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
    backgroundColor: "#fff",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 5,
  },
  title: {
    marginBottom: 20,
    alignSelf: "stretch",
    fontWeight: "bold",
    color: "#32305D",
    fontSize: 26,
  },
  passwordMatch: {
    color: "#B10024",
    fontWeight: "bold",
    alignSelf: "stretch",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#EEEEEE",
    textAlign: "center",
  },
  errorIcon: {
    width: 20,
    height: 20,
  },
});
