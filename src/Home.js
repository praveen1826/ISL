import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import axios from 'axios';
import * as ImagePicker from 'react-native-image-picker';
import {Button} from 'react-native-paper';
import {ImageBackground} from 'react-native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({children, title}): Node => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle]}>{title}</Text>
      <Text style={[styles.sectionDescription]}>{children}</Text>
    </View>
  );
};

const Home: () => Node = () => {
  const [filepath, setFilepath] = useState(0);
  const [fileData, setFileData] = useState(0);
  const [fileUri, setFileUri] = useState(0);
  const [prediction, setPrediction] = useState();
  const [predictionV2, setPredictionV2] = useState();
  const [predictionV3, setPredictionV3] = useState();
  const [predictionMN, setPredictionMN] = useState();
  const [isClicked, setIsClicked] = useState(false);

  const uploadImage = async fileUri => {
    const formData = new FormData();

    // Update the formData object
    formData.append('image', {
      uri: fileUri,
      type: 'image/jpeg',
      name: 'myImage',
    });

    setIsClicked(false);

    // Request made to the backend api
    // Send formData object
    await axios
      .post('http://172.16.77.135:8000/predict/', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      //.then(response => console.log(response.data))
      .then(response => setPrediction(response.data.prediction));

    await axios
      .post('http://172.16.77.135:8000/predictV2/', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      //.then(response => console.log(response.data))
      .then(response => setPredictionV2(response.data.prediction));
    await axios
      .post('http://172.16.77.135:8000/predictV3/', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      //.then(response => console.log(response.data))
      .then(response => setPredictionV3(response.data.prediction));
    await axios
      .post('http://172.16.77.135:8000/predictV4/', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      //.then(response => console.log(response.data))
      .then(response => setPredictionMN(response.data.prediction));
  };

  const clicked = () => {
    setIsClicked(true);
  };

  chooseImage = () => {
    let options = {
      title: 'Select Image',
      includeBase64: true,
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};

        setFilepath(response);
        setFileData(response.assets[0].base64);
        setFileUri(response.assets[0].uri);
        uploadImage(response.assets[0].uri);
      }
    });
  };

  const renderFileUri = () => {
    if (fileUri) {
      return <Image source={{uri: fileUri}} style={styles.images} />;
    } else {
      return (
        <Image
          source={require('.././assets/dummy.jpg')}
          style={styles.images}
        />
      );
    }
  };

  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
      <ImageBackground
        style={styles.ImageBackground}
        source={require('.././assets/purpleBack.jpg')}>
        <ScrollView>
          <View style={{flex: 1, paddingBottom: '5%'}}>
            <Section title="Instructions">
              1. Click Choose Image And Select An Image From Gallery
            </Section>
            <Text style={styles.Instruction}>
              2. After Choosing Click Predict
            </Text>
          </View>
          <View
            style={[
              styles.body,
              {
                flex: 3,
              },
            ]}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                paddingBottom: 10,
                color: 'white',
              }}>
              Select Image From Gallery
            </Text>
            <View style={styles.ImageSections}>
              <View>
                {renderFileUri()}
                <Text style={{textAlign: 'center'}}>Selected Image</Text>
              </View>
            </View>

            <View style={styles.btnParentSection}>
              <TouchableOpacity
                onPress={this.chooseImage}
                style={styles.btnSection}>
                <Text style={styles.btnText}>Choose File</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={clicked} style={styles.btnSection}>
                <Text style={styles.btnText}>Predict</Text>
              </TouchableOpacity>
              <View>
                <Text
                  style={{textAlign: 'center', fontSize: 30, color: 'orange'}}>
                  CNN_seq1: {isClicked ? prediction : ' '}
                </Text>
                <Text
                  style={{textAlign: 'center', fontSize: 30, color: 'yellow'}}>
                  CNN_seq2: {isClicked ? predictionV2 : ' '}
                </Text>
                <Text
                  style={{textAlign: 'center', fontSize: 30, color: 'yellow'}}>
                  CNN_seq3: {isClicked ? predictionV3 : ' '}
                </Text>
                <Text
                  style={{textAlign: 'center', fontSize: 30, color: 'yellow'}}>
                  CNN_MN: {isClicked ? predictionMN : ' '}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};
const differentFont = 'GoodFeelingSansDemo';
const styles = StyleSheet.create({
  ImageBackground: {
    flex: 1,
    width: null,
    height: null,
  },
  sectionContainer: {
    marginTop: 10,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'GoodFeelingSansDemo',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'white',
  },
  Instruction: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'white',
    paddingHorizontal: 24,
  },
  highlight: {
    fontWeight: '700',
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  body: {
    justifyContent: 'center',
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Home;
