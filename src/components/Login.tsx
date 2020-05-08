import React from "react";

interface LoginProps {
  onSignIn: () => Promise<void>;
  authError: firebase.auth.AuthError | null;
}

const Login: React.FC<LoginProps> = ({ onSignIn, authError }) => {
  return (
    <div className="Login">
      <h1>Chat App!</h1>
      <button onClick={onSignIn}>Sign in with Google</button>
      {authError && (
        <div>
          <p>Sorry, there was some error</p>
          <p>
            <i>{authError.message}</i>
          </p>
          <p>Please try again</p>
        </div>
      )}
    </div>
  );
};

export default Login;
