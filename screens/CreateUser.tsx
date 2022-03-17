import {
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Button,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { createUser } from "../features/User";

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
    <SafeAreaView>
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
      <TextInput
        secureTextEntry={true}
        value={password2}
        onChange={(e) => {
          combinedOnChange(setPassword2, e);
        }}
        placeholder="password"
      />
      <Button
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
