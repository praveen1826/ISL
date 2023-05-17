import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import React from 'react';

const SearchBar = ({term, onTermChange, onTermSubmit}) => {
  return (
    <View style={styles.search}>
      <Image
        style={styles.iconStyle}
        source={require('../../assets/icons/searchIcon.png')}
      />
      <TextInput
        autoCapitalize="none"
        style={styles.inputStyle}
        placeholder="Small Letters Only"
        value={term}
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#ffff80',
    height: 50,
    borderRadius: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  inputStyle: {
    borderColor: 'black',
    borderWidth: 1,
    flex: 1,
    fontSize: 18,
    color: 'black',
  },
  iconStyle: {
    alignSelf: 'center',
    marginHorizontal: 10,
  },
});

export default SearchBar;
