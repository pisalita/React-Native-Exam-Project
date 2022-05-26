import { StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const CustomCheckbox = ({
  getCheckboxValue,
}: {
  getCheckboxValue: (value: boolean) => void;
}) => {
  const [checked, setChecked] = useState(false);

  function onCheckmarkPress() {
    setChecked((prev) => !prev);
  }

  useEffect(() => {
    getCheckboxValue(checked);
  }, [checked]);

  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={() => {
        onCheckmarkPress();
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
