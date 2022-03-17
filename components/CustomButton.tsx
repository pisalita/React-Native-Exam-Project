import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

type Props = {
  title: string;
  onPress: () => void;
};

const CustomButton = ({ title, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  appButtonContainer: {
    alignSelf: "stretch",
    elevation: 8,
    backgroundColor: "#5050A5",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
