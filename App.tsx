if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {CustomNav} from './src/CustomNav';
import CustomNavbar from './src/CustomNavbar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppStack from './src/navigation/AppStack';

const Drawer = createDrawerNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
