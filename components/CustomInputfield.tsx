import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import React from "react";

const CustomInputfield = ({
  label,
  value,
  onChange,
  secureTextEntry,
}: //borderBottom,
{
  label: string;
  value: string;
  onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  secureTextEntry: boolean;
  //borderBottom: boolean;
}) => {
  return (
    <View
      style={[
        styles.inputFieldContainer,
        //borderBottom && { borderBottomWidth: 1 },
      ]}
    >
      <Text style={styles.inputFieldLabel}>{label}</Text>
      <TextInput
        style={styles.inputFieldText}
        secureTextEntry={secureTextEntry}
        value={value}
        onChange={onChange}
      />
    </View>
  );
};

export default CustomInputfield;

const styles = StyleSheet.create({
  inputFieldContainer: {
    alignSelf: "stretch",
    
  },
  inputFieldLabel: {
    fontWeight: "bold",
    paddingTop: 5,
    paddingLeft: 5,
  },
  inputFieldText: {
    paddingBottom: 5,
    paddingLeft: 5,
  },
});
