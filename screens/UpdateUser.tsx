import {
  Image,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInputfield from "../components/CustomInputfield";
import CustomButton from "../components/CustomButton";
import { useAppDispatch } from "../app/hooks";
import { updateUser } from "../features/User";

const UpdateUser = () => {
  const [displayName, setDisplayName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
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
      <Text style={styles.title}>Update your user!</Text>
      <View style={[styles.inputfieldContainer, styles.shadow]}>
        <CustomInputfield
          label="display name"
          value={displayName}
          onChange={(e) => {
            combinedOnChange(setDisplayName, e);
          }}
          borderBottom={true}
        />
        <CustomInputfield
          label="photo url"
          value={photoUrl}
          onChange={(e) => {
            combinedOnChange(setPhotoUrl, e);
          }}
          borderBottom={false}
        />
      </View>
      <CustomButton
        title="Update user"
        onPress={() => {
          dispatch(updateUser({ displayName, photoUrl }));
        }}
      />
    </SafeAreaView>
  );
};

export default UpdateUser;

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
});
