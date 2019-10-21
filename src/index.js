import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './service-worker';

import App from './components/app';
import Firebase, { FirebaseContext } from './components/firebase';

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <App />
    </FirebaseContext.Provider>,
    document.getElementById('root'),
);

serviceWorker.unregister();
