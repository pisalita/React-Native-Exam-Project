import {
  View,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Button,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch } from "../app/hooks";
import { createUser } from "../features/User";

const CreateUser = () => {
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
    <SafeAreaView>
      <Text>Login</Text>
      <TextInput
        value={email}
        onChange={(e) => {
          combinedOnChange(setEmail, e);
        }}
        placeholder="email"
      />
      <TextInput
        value={password}
        onChange={(e) => {
          combinedOnChange(setPassword, e);
        }}
        placeholder="password"
      />
      <Button
        title="Create user"
        onPress={() => {
          if (email && password !== "") {
            dispatch(createUser({ email, password }));
          }
        }}
      />
    </SafeAreaView>
  );
};

export default CreateUser;
