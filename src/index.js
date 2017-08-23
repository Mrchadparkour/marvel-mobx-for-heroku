import React from 'react';
import ReactDOM from 'react-dom';
import MarvelStore from "./components/MarvelStore"
import MarvelList from "./components/MarvelList"
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MarvelList store={MarvelStore} />, document.getElementById('root'));
registerServiceWorker();
