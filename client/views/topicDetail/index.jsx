import React from 'react';
import { Router, Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import Routes from '../config/router'

import { addAsync } from "../../store/reducer/test";

@connect(
    state => ({num: state}),
    {addAsync}
)

export default class App extends React.Component{
    render() {
        const num = this.props.num;
        const addAsync = this.props.addAsync;
        return (
            <div>
                <div>当前数字{num}</div>
                <button onClick={addAsync}>+</button>
            </div>
        )
    }
}

