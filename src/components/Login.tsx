import React from 'react';

interface LoginProps {
    onSignIn: () => Promise<void>
}

const Login: React.FC<LoginProps> = ({onSignIn}) => {
    return (
        <div className='Login'>
            <h1>Chat App!</h1>
            <button onClick={onSignIn}>Sign in with Google</button>
        </div>    
    );
}

export default Login;