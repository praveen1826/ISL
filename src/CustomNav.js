import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerItemList} from '@react-navigation/drawer';
import About from './About';
//import Model from './Model';
import Home from './Home';
import {NavigationContainer} from '@react-navigation/native';
import {Text, View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Model from './Text2Image';

const Drawer = createDrawerNavigator();

export const CustomNav = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => {
        return (
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: 'white',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '25%',
                paddingBottom: 10,
              }}>
              <Image
                style={{width: '100%', height: '100%'}}
                source={require('.././assets/dummy.jpg')}
              />
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
      screenOptions={{
        headershown: false,
      }}>
      <Drawer.Screen name="Sign To Text" component={Home} />
      <Drawer.Screen name="Text To Sign" component={Model} />
      <Drawer.Screen name="Learn" component={About} />
    </Drawer.Navigator>
  );
};
