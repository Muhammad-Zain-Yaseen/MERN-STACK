import React, { useState } from 'react';

function LoginForm() {
  const [username, setUsername] = useState('Zain Yaseen');
  const [password, setPassword] = useState('hi@123');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username || !password)
    
    {
      setError('You are requested to provide the above credentials Please:');
    } else {
      setError('');

      fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(
          { username, password }
          ),
        })
          .then((res) => {
            if (!res.ok) {
              // throw new Error('Unable to login');
            }
              return res.json();
          })
          .then((data) => {
            if (data.error) {
              setError(data.error);
            } else {
              setToken(data.token);
              localStorage.setItem('token', data.token);
            }
          })
          .catch((error) => {
            setError(error.message);
          });
      }
    };
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.error) {
  //           setError(data.error);
  //         } else {
  //           setToken(data.token);
  //           localStorage.setItem('token', data.token);
  //         }
  //       })
  //       .catch((error) => {
  //         setError(error.message);
  //       });
  //   }
  // };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
      {token && <p>Token: {token}</p>}
    </div>
  );
}

export default LoginForm;
