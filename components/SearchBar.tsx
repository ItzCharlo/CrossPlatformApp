import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SearchBar } from '@rneui/themed';

interface Props{
  placeholder: string;
  value?: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
}

const SearchBarComponent = ({placeholder, onPress, value, onChangeText}: Props) => {
  const [search, setSearch] = useState("");


  return (
    <View style={styles.container}>
      <SearchBar
      onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        lightTheme
        round
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.inputContainer}
      />
    </View>
  );
}

export default SearchBarComponent;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  searchContainer: {
    width: "90%",
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 0,
  },
  inputContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    height: 40,
  },
});
