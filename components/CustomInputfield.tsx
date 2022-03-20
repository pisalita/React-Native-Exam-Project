import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import React, { useState } from "react";

const CustomInputfield = ({
  label,
  value,
  onChange,
  secureTextEntry,
  errorText,
  borderBottom,
}: {
  label: string;
  value: string;
  onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  secureTextEntry: boolean;
  errorText: string;
  borderBottom?: boolean;
}) => {
  const [touched, setTouched] = useState(false);

  return (
    <View
      style={[
        styles.inputFieldContainer,
        borderBottom && { borderBottomWidth: 1 },
      ]}
    >
      <Text style={styles.inputFieldLabel}>{label}</Text>
      <TextInput
        style={styles.inputFieldText}
        secureTextEntry={secureTextEntry}
        value={value}
        onChange={onChange}
        onBlur={() => {
          setTouched(true);
        }}
      />
      {!value && touched && <Text style={{ color: "red" }}> {errorText} </Text>}
    </View>
  );
};

export default CustomInputfield;

const styles = StyleSheet.create({
  inputFieldContainer: {
    alignSelf: "stretch",
    borderColor: "#EEEEEE",
  },
  inputFieldLabel: {
    fontWeight: "bold",
    paddingTop: 5,
    paddingLeft: 5,
    color: "#32305D",
  },
  inputFieldText: {
    paddingBottom: 5,
    paddingLeft: 5,
  },
});
