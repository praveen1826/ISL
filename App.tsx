import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {CustomNav} from './src/CustomNav';

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <CustomNav />
    </NavigationContainer>
  );
}

export default App;
