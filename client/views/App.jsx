import React from 'react';
import { Router, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Routes from '../config/router'

import { addAsync } from "../store/reducer/test";

@connect(
    state => ({num: state}),
    {addAsync}
)

class App extends React.Component{
    render() {
        // return [
        //     <Link to="/" key="index">首页</Link>,
        //     <Link to="/detail" key="detail">详情页</Link>,
        //     <Routes key="router"/>
        // ]
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

export default App;