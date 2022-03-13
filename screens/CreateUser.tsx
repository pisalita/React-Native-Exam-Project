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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const dispatch = useAppDispatch();

  const onNameChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const value = e.nativeEvent.text;
    setName(value);
  };
  const onEmailChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const value = e.nativeEvent.text;
    setEmail(value);
  };
  const onPasswordChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const value = e.nativeEvent.text;
    setPassword(value);
  };
  const onDisplayNameChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const value = e.nativeEvent.text;
    setDisplayName(value);
  };
  const onPhotoUrlChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const value = e.nativeEvent.text;
    setPhotoUrl(value);
  };

  //how do i call this function and pass e?? ask christian!
  const combinedOnChange = (
    setter: any,
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const value = e.nativeEvent.text;
    setter(value);
  };

  return (
    <SafeAreaView>
      <Text>Login</Text>
      <TextInput value={name} onChange={onNameChange} placeholder="name" />
      <TextInput value={email} onChange={onEmailChange} placeholder="email" />
      <TextInput
        value={password}
        onChange={onPasswordChange}
        placeholder="password"
      />
      <TextInput
        value={displayName}
        onChange={onDisplayNameChange}
        placeholder="display name"
      />
      <TextInput
        value={photoUrl}
        onChange={onPhotoUrlChange}
        placeholder="photo url"
      />
      <Button
        title="Create user"
        onPress={() => {
          if (name && email && displayName && password !== null) {
            dispatch(
              createUser({ name, email, password, displayName, photoUrl })
            );
          }
        }}
      />
    </SafeAreaView>
  );
};

export default CreateUser;
