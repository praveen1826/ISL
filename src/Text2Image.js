import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {Searchbar, Card, Paragraph} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import SearchBar from '../src/components/SearchBar';
import t2i from './api/t2i';
import SignsList from './components/SignsList';

export default Text2Image = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [signs, setSign] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // console.log(signs);
  // console.log(signs.length);
  // console.log(errorMessage);

  const searchApi = async () => {
    try {
      const response = await t2i.get(`/${searchQuery}`);
      setSign([response.data]);
      setErrorMessage(null);
    } catch (e) {
      setErrorMessage('Something Went Wrong');
    }
  };

  const intialApi = async () => {
    try {
      const response = await t2i.get(`/${searchQuery}`);
      setSign(response.data);
      setErrorMessage(null);
    } catch (e) {
      setErrorMessage('Something Went Wrong');
    }
  };

  useEffect(() => {
    intialApi();
  }, []);

  return (
    <SafeAreaView>
      <SearchBar
        term={searchQuery}
        onTermChange={setSearchQuery}
        onTermSubmit={searchApi}
      />
      {errorMessage ? <Text>Something Went Wrong</Text> : null}
      <Text style={styles.text}>found {signs.length} signs</Text>
      <SignsList sig={signs} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    paddingLeft: 10,
  },
  container: {
    paddingTop: 10,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'red',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'red',
  },
});
