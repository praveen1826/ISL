import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, View, Image} from 'react-native';

const CustomNavbar = props => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={{width: '100%', height: 200}}>
          <Image
            style={{
              flex: 1,
              width: undefined,
              height: undefined,
              marginBottom: 10,
            }}
            source={require('.././assets/icons/islNav.jpg')}
          />
        </View>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomNavbar;
