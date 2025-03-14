import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import Text from "./Text";

const Button = ({
  onPress,
  text,
  width,
  color,
  textColor = "#fff",
  style,
  disabled,
}) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        style={[
          styles.btn,
<<<<<<< HEAD
          {
            // width: width ? "100%" : "90%",
          },
=======
          { backgroundColor: color || "#002366" }, // Fallback to blue theme
          { width: width || "100%" },
>>>>>>> 7f98822 (Added new updates to branch)
          style,
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={[styles.btnText, { color: textColor }]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
<<<<<<< HEAD
    backgroundColor: "#002366",
=======
>>>>>>> 7f98822 (Added new updates to branch)
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
<<<<<<< HEAD

    width: "100%"
  },
  btnText: {
    color: "#fff",
  },
});

export default Button;
=======
  },
  btnText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Button;
>>>>>>> 7f98822 (Added new updates to branch)
