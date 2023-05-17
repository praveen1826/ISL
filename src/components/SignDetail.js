import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const SignDetail = ({result}) => {
  console.log(result);
  return (
    <View>
      <Text style={styles.text}> Character : {result.character}</Text>
      <Image
        style={styles.image}
        source={{uri: 'http://20.219.13.160:8000' + result.image}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 10,
    paddingTop: 10,
    color: 'black',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 4,
  },
});

export default SignDetail;
