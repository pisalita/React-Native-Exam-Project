import { StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const CustomCheckbox = ({
  getCheckboxValue,
}: {
  getCheckboxValue: (value: boolean) => void;
}) => {
  const [checked, setChecked] = useState(false);

  function onCheckmarkPress() {
    setChecked(!checked);
  }

  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={() => {
        onCheckmarkPress();
        //returning the !checked as we send the value before the component rerenders and therefore the value doesent get updated before we return it.
        getCheckboxValue(!checked);
      }}
    >
      {checked && <Ionicons name="checkmark" size={20} color="white" />}
    </Pressable>
  );
};

export default CustomCheckbox;

const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#32305D",
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: "#32305D",
  },
  appContainer: {
    flex: 1,
    alignItems: "center",
  },
  appTitle: {
    marginVertical: 16,
    fontWeight: "bold",
    fontSize: 24,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    marginLeft: 8,
    fontWeight: "bold",
    fontSize: 18,
  },
});
