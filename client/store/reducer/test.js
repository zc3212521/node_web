import actions from '../action/test'

const init = 10;

export const counter = (state=init, action) => {
    switch(action.type) {
        case actions.test.ADD:
            return state + 1
        case actions.test.REMOVE:
            return state -1
        default:
            return state
    }
}

export const addNum = () => ({type:actions.test.ADD})
export const removeNum = () => ({type:actions.test.REMOVE})
export const addAsync = () => dispatch => {
    setTimeout(()=>{
        dispatch(addNum())
    })
}