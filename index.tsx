import React, { Component } from 'react';
import { render } from 'react-dom';
import {Provider} from 'react-mono-state';
import {store} from './states/reducers/createStore';
import './style.css';
import {TodosContainer} from './containers/todosContainer'

interface AppProps { }
interface AppState {
}

class App extends Component<AppProps, AppState> {
 
  render() {
    return (
      <Provider store={store}>
        <TodosContainer/>
      </Provider>
    );
  }
}

render(<App />, document.getElementById('root'));
