import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerItemList} from '@react-navigation/drawer';

//import Model from './Model';
import Home from '../Home';
import {NavigationContainer} from '@react-navigation/native';
import {Text, View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Text2Image from '../Text2Image';
import CustomNavbar from '../CustomNavbar';
import About from '../About';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomNavbar {...props} />}
      screenOptions={{
        headershown: false,
        drawerLabelStyle: {marginLeft: -25},
      }}>
      <Drawer.Screen
        name="Sign To Text"
        component={Home}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../assets/icons/signToText.png')}
              style={{height: size, width: size}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Text To Sign"
        component={Text2Image}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../assets/icons/textToSign.png')}
              style={{height: size, width: size}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={About}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../assets/icons/learn.png')}
              style={{height: size, width: size}}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;
