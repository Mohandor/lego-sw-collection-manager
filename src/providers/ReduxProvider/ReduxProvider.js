import React from 'react';
import {Provider} from 'react-redux';
import store from '../../stores';

export const reduxProvider = (props) => {
    return <Provider store={store} children={props.children}/>
}

export default reduxProvider;