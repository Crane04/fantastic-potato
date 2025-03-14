import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
<<<<<<< HEAD
import Text from "./Text";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
=======
import Text from "./Text"; // Using the updated WText
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

>>>>>>> 7f98822 (Added new updates to branch)
const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  type,
  options,
<<<<<<< HEAD
}) => {
  const [open, setOpen] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  if (options) {
    console.log(options)
    return (
      <>
        <Text style={styles.label}>{label}</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
=======
  style, // Added to accept styles from parent
  labelStyle, // Added to accept label styles from parent
}) => {
  const [open, setOpen] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  if (options) {
    console.log(options);
    return (
      <>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }, style]}
>>>>>>> 7f98822 (Added new updates to branch)
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={options}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Select item" : "..."}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={onChangeText}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? "blue" : "black"}
              name="Safety"
              size={20}
            />
          )}
        />
      </>
    );
  }
<<<<<<< HEAD
  if (type === "date") {
    return (
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text onPress={() => setOpen(true)} style={styles.dateText}>
          {value.toISOString().split("T")[0]}
        </Text>
        <DateTimePicker
          mode="datetime"
          display="default"
          value={value}
          onChange={(event, newDate) => {
            onChangeText(newDate);
          }}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
=======

  if (type === "date") {
    return (
      <View>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        <Text onPress={() => setOpen(true)} style={[styles.dateText, style]}>
          {value.toISOString().split("T")[0]}
        </Text>
        {open && (
          <DateTimePicker
            mode="datetime"
            display="default"
            value={value}
            onChange={(event, newDate) => {
              setOpen(false);
              onChangeText(newDate);
            }}
          />
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput
        style={[styles.input, style]} // Use the passed style for dynamic theming
>>>>>>> 7f98822 (Added new updates to branch)
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={type ? type : "default"}
        placeholderTextColor={"#AAAAAA"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
<<<<<<< HEAD
    marginVertical: 10,
=======
    marginVertical: 6,
>>>>>>> 7f98822 (Added new updates to branch)
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
<<<<<<< HEAD
=======
    fontWeight: "500", // Ensure label renders prominently
>>>>>>> 7f98822 (Added new updates to branch)
  },
  input: {
    fontSize: 16,
    padding: 10,
<<<<<<< HEAD
    borderColor: "#212121",
    borderWidth: 1,
    borderRadius: 5,
    color: "royal-blue",
    
=======
    borderRadius: 5,
    borderWidth: 1.5, // Ensure border is visible
>>>>>>> 7f98822 (Added new updates to branch)
  },
  dateText: {
    fontSize: 16,
    padding: 10,
<<<<<<< HEAD
    borderColor: "rgb(79 70 229)",
    borderWidth: 1,
=======
    borderWidth: 1.5,
>>>>>>> 7f98822 (Added new updates to branch)
    borderRadius: 5,
  },
  dropdown: {
    height: 50,
<<<<<<< HEAD
    borderColor: 'gray',
    borderWidth: 0.5,
=======
    borderWidth: 1.5,
>>>>>>> 7f98822 (Added new updates to branch)
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
<<<<<<< HEAD

=======
>>>>>>> 7f98822 (Added new updates to branch)
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

<<<<<<< HEAD
export default Input;
=======
export default Input;
>>>>>>> 7f98822 (Added new updates to branch)
