/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import RootStack from './src/navigation/RootStack';
import { Provider } from 'react-redux';
import { store } from './src/store';
import Toast from 'react-native-toast-message';
import "./global.css"



function App() {

  return (

    <Provider store={store}>
      <RootStack />
      <Toast />
    </Provider>
  );
}




export default App;
