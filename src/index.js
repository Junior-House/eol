import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './service-worker';
import App from './components/app';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.register();
