import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerItemList} from '@react-navigation/drawer';
import About from './About';
//import Model from './Model';
import Home from './Home';
import {NavigationContainer} from '@react-navigation/native';
import {Text, View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Model from './Model';

const Drawer = createDrawerNavigator();

export const CustomNav = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => {
        return (
          <SafeAreaView
            style={{flex: 1, paddingTop: 20, backgroundColor: 'white'}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 140,
              }}>
              <Image
                style={{width: 96, height: 88}}
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
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Model" component={Model} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
};
