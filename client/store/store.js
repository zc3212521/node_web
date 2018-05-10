import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { counter } from './reducer/test'

export default function configureStore(initialState, ifClient) {
    if(ifClient === 'client'){
        const reduxDevTools = window.devToolsExtension ? window.devToolsExtension() : () => {}
        return createStore(counter, initialState, compose(applyMiddleware(thunk), reduxDevTools));
    } else {
        return createStore(counter, initialState, compose(applyMiddleware(thunk)));
    }
}
