import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import React from 'react';
import SignDetail from './SignDetail';

const SignsList = ({sig}) => {
  return (
    <View>
      <Text style={styles.text}>SignsList</Text>
      <FlatList
        data={sig}
        keyExtractor={sign => sig.character}
        renderItem={({item}) => {
          return <SignDetail result={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    paddingLeft: 10,
  },
});

export default SignsList;
