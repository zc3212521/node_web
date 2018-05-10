import React from 'react'
import App from './views/App.jsx'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import configureStore from './store/store'
// `__INITIAL_STATE__` 来自服务器端渲染
// const initialState = window.__INITIAL_STATE__;
const store = configureStore()

export default (routerContext, url) => {
    return (
        <Provider store={store}>
            <StaticRouter context={routerContext} location={url}>
                <App />
            </StaticRouter>
        </Provider>
    )
}
