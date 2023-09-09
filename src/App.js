import './App.css';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [state, setState] = useState({
    length: 0,
    upper: false,
    lower: false,
    number: false,
    symbol: false
  })
  const [types] = useState({
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower: "abcdefghijklmnopqrstuvwxyz",
    number: "0123456789",
    symbol: "~!@#$%^&*()_+=-|][{}|"
  })
  const [password, setPassword] = useState('')
  const [prePassowrds, setPrePassword] = useState([])

  useEffect(() => {
    const value = localStorage.getItem('passwords')
    if (value) setPrePassword(JSON.parse(value))
  }, [])

  const getValue = () => {
    const x1 = []
    if (state.upper) x1.push(types.upper[Math.floor(Math.random() * types.upper.length)])

    if (state.lower) x1.push(types.lower[Math.floor(Math.random() * types.lower.length)])

    if (state.number) x1.push(types.number[Math.floor(Math.random() * types.number.length)])

    if (state.symbol) x1.push(types.symbol[Math.floor(Math.random() * types.symbol.length)])

    if (x1.length == 0) return ""

    return x1[Math.floor(Math.random() * x1.length)]
  }

  const generatePassword = () => {
    const len1 = state.length
    let passwordStr = ""
    if (len1 < 1) toast('Please Enter Password Length')
    else if (len1.includes('.')) toast('Please Enter Valid Password Length')
    else if (!state.upper && !state.lower && !state.number && !state.symbol) toast('Please select alteast one combination')
    else {
      for (let i = 0; i < len1; i++) {
        const x = getValue()
        passwordStr += x
      }
      if (passwordStr) {
        let localPasswords = [...prePassowrds]
        if (localPasswords.length > 4) localPasswords.pop()

        if (password) localPasswords.unshift(password)
        localStorage.setItem('passwords', JSON.stringify(localPasswords))
        setPassword(passwordStr)
        setPrePassword(localPasswords)
      }

    }
  }
  const handlePassword = () => {
    navigator.clipboard.writeText(password)
    toast('Password copied to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

 

  return (
    <div className="App">
      <div>
        <h2 className='pass-heading'>Random Password Generator</h2>
        <div className="container">
          <div className="header">
            <span id="pw-display">{password ? password : "Password Here"}</span>
            {password && <span className='fs-20' onClick={() => handlePassword()}>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                <path d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
              </svg>
            </span>}
          </div>
          <div className="body">
            <div className="body-parts">
              <label for="length" id="pw-length">Password Length</label>
              <input type="number" min="8" max="30" id="length" onChange={(e) => setState({ ...state, length: e.target.value || 0 })} />
            </div>
            <div className="body-parts">
              <label for="uppercase" id="pw-uppercase">Contains uppercase Letters</label>
              <input type="checkbox" id="uppercase" onChange={(e) => setState({ ...state, upper: e.target.checked })} />
            </div>
            <div className="body-parts">
              <label for="lowerrcase" id="pw-lowercase">Contains Lowercase Letters</label>
              <input type="checkbox" id="lowercase" onChange={(e) => setState({ ...state, lower: e.target.checked })} />
            </div>
            <div className="body-parts">
              <label for="number" id="pw-number">Contains Numbers</label>
              <input type="checkbox" id="number" onChange={(e) => setState({ ...state, number: e.target.checked })} />
            </div>
            <div className="body-parts">
              <label for="symbol" id="pw-symbol">Contains Symbols</label>
              <input type="checkbox" id="symbol" onChange={(e) => setState({ ...state, symbol: e.target.checked })} />
            </div>
          </div>
          <div className="footer">
            <button type="button" id="btn" onClick={() => generatePassword()}>Generate Password</button>
          </div>
        </div>
      </div>

      <div className='pre-pass-container'>
        <h2>Previously Generated Passwords</h2>
        {prePassowrds?.length > 0 ? prePassowrds.map((data) => (
          <p className='pass-list'>{data}</p>
        )) : <p className='pass-list'>No previous password available</p>
        }

      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
