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
  //const isDarkMode = useColorScheme() === 'dark';
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
  const [isClicked, setIsClicked] = useState(false);

  //const isDarkMode = useColorScheme() === 'dark';

  /*const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };*/

  const uploadImage = async fileUri => {
    const formData = new FormData();

    // Update the formData object
    formData.append('image', {
      uri: fileUri,
      type: 'image/jpeg',
      name: 'myImage',
    });

    setIsClicked(false);

    //axios.defaults.headers.common['X-CSRFToken'] =
    //'XwK5UXkAWm5d5v5m3EQPoE62cyoYZZMB';

    // Request made to the backend api
    // Send formData object
    await axios
      .post('http://20.219.13.160:8000/predict/', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      //.then(response => console.log(response.data))
      .then(response => setPrediction(response.data.prediction));

    await axios
      .post('http://20.219.13.160:8000/predictV2/', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      //.then(response => console.log(response.data))
      .then(response => setPredictionV2(response.data.prediction));
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

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        //console.log('response', JSON.stringify(response.assets[0].uri));
        setFilepath(response);
        setFileData(response.assets[0].base64);
        setFileUri(response.assets[0].uri);
        uploadImage(response.assets[0].uri);
      }
    });
  };

  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
        setFilepath(response);
        setFileData(response.data);
        setFileUri(response.uri);
      }
    });
  };

  const renderFileData = () => {
    if (fileData) {
      return (
        <Image
          source={{uri: 'data:image/jpeg;base64,' + fileData}}
          style={styles.images}
        />
      );
    } else {
      return (
        <Image
          source={require('.././assets/dummy.jpg')}
          style={styles.images}
        />
      );
    }
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
        style={{width: '100%', height: '100%'}}
        source={require('.././assets/purpleBack.jpg')}>
        <View style={{flex: 1}}>
          <Section title="Indian Sign Language">
            This App Will Detect The Indian Sign Language
          </Section>
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
              {renderFileData()}

              <Text style={{textAlign: 'center'}}>Base 64 String</Text>
            </View>
            <View>
              {renderFileUri()}
              <Text style={{textAlign: 'center'}}>File Uri</Text>
            </View>
          </View>

          <View style={styles.btnParentSection}>
            <TouchableOpacity
              onPress={this.chooseImage}
              style={styles.btnSection}>
              <Text style={styles.btnText}>Choose File</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.launchCamera}
              style={styles.btnSection}>
              <Text style={styles.btnText}>Directly Launch Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={clicked} style={styles.btnSection}>
              <Text style={styles.btnText}>Predict</Text>
            </TouchableOpacity>
            <View>
              <Text
                style={{textAlign: 'center', fontSize: 30, color: 'yellow'}}>
                Model 1: {isClicked ? prediction : ' '}
              </Text>
              <Text
                style={{textAlign: 'center', fontSize: 30, color: 'yellow'}}>
                Model 2: {isClicked ? predictionV2 : ' '}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
const differentFont = 'GoodFeelingSansDemo';
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
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
