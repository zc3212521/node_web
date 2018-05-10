import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader' //热更替相关
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

import configureStore  from './store/store'
import App from './views/App.jsx'

// `__INITIAL_STATE__` 来自服务器端渲染
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState, 'client')

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




