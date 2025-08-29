/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import RootStack from './src/navigation/RootStack';
import { Provider } from 'react-redux';
import { store } from './src/store';


function App() {

  return (
    // <TailwindProvider utilities={utilities}>
    <Provider store={store}>
      <RootStack />
    </Provider>
    // </TailwindProvider>
  );
}




export default App;
