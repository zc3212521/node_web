import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader' //热更替相关
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

import thunk from 'redux-thunk'

import App from './views/App.jsx'

import { counter } from './store/reducer/test'
import { createStore, applyMiddleware, compose } from 'redux'
const reduxDevTools = window.devToolsExtension ? window.devToolsExtension() : () => {}
const store = createStore(counter, compose(applyMiddleware(thunk), reduxDevTools));

const root = document.getElementById('root')
const render = (Component, renderMethod = "render") => {
    ReactDOM[renderMethod](
        <AppContainer>
            <Provider store={store}>
                <BrowserRouter>
                    <Component/>
                </BrowserRouter>
            </Provider>
        </AppContainer>,
        root
    );
}

render(App)

if (module.hot) {
    module.hot.accept('./views/App.jsx', () => {
        const NextApp = require('./views/App.jsx').default
        render(NextApp, 'hydrate')
    })
}




