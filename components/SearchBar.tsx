import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SearchBar } from '@rneui/themed';

interface Props{
  placeholder: string;
  onPress?: () => void;
}

const SearchBarComponent = ({placeholder, onPress}: Props) => {
  const [search, setSearch] = useState("");


  return (
    <View style={styles.container}>
      <SearchBar
      onPress={onPress}
        placeholder={placeholder}
        value={search}
        onChangeText={setSearch}
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
