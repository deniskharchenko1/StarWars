import React from 'react';
import {Redirect} from 'react-router-dom';

const LoginPage = ({isLoggedIn, onLogin}) => {

    if (isLoggedIn) {
        return <Redirect to="/"/>
    }

    return (
        <div className="jumbotron">
            <h3>Login to see the secrets</h3>
            <button className='btn btn-primary' 
                    onClick={onLogin}>
                    Login</button>
        </div>
    )

}

export default LoginPage;