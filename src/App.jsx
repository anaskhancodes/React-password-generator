import { useState } from 'react';
import React from 'react';
import './App.css'
import { ToastContainer, } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { copySuccessFully } from './messages';
import { uppercaseLetters, lowercaseLetters, num, speachalCharacters } from './characters';

function App() {

  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(20);
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const handleGeneratePassword = (e) => {
    let charactersList = ""

    if(!uppercase && !lowercase && !numbers && !symbols){
      notify("You must Select at last one option", true)
    }

    if (uppercase) {
      charactersList = charactersList + uppercaseLetters;
    }

    if (lowercase) {
      charactersList = charactersList + lowercaseLetters;
    }

    if (numbers) {
      charactersList = charactersList + num;
    }

    if (symbols) {
      charactersList = charactersList + speachalCharacters;
    }

    setPassword(generatePassword(charactersList));
  }

  const generatePassword = (charactersList) => {
    let password = '';
    const charactersListLength = charactersList.length;

    for (let i = 0; i < passwordLength; i++) {
      const charactersIndex = Math.round(Math.random() * charactersListLength);

      password = password + charactersList.charAt(charactersIndex)
    }

    return password
  }

  const copyPassword = () => {
    const newTextArea = document.createElement("textarea")
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand("copy")
    newTextArea.remove()
  }
  const notify = (message, haseError = false)  => {

    if(haseError){
      toast.error(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }else{
      toast(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const handleCopyBtn = (e) => {
    if(password === ""){
      notify("Noting to copy", true)
    }else{
      copyPassword()
      notify(copySuccessFully)
    }
  }





  return (
    <div className="App">

      <div className="contaner">

        <div className="generator">

          <h1><i class="fa-solid fa-lock"></i></h1>

          <h2 className="app-name">Password Generator</h2>

          <div className="generate-password-div">
            <h3>{password}</h3>
            <button onClick={handleCopyBtn} className="btn-copy"><i class="fa-solid fa-copy"></i></button>
          </div>

          <div className='form'>
            <label htmlFor="password">Password Length</label>
            <input
              defaultValue={passwordLength}
              onClick={(e) => setPasswordLength(e.target.value)}
              type="number" name="password" id="password" min={8} max={20} />
          </div>

          {/* ******************** Uppercase Letters ********************** */}
          <div className='form'>
            <label htmlFor="Uppercase">Uppercase Letters</label>
            <input
              checked={uppercase}
              onClick={(e) => setUppercase(e.target.checked)}
              type='checkbox' name="Uppercase" id="Uppercase"
            />
          </div>

          {/* ******************** Lowercase Letters ********************** */}
          <div className='form'>
            <label htmlFor="Lowercase">Lowercase Letters</label>
            <input
              checked={lowercase}
              onClick={(e) => setLowercase(e.target.checked)}
              type='checkbox' name="Lowercase" id="Lowercase"
            />
          </div>

          {/* ********************** Numbers ****************************** */}
          <div className='form'>
            <label htmlFor="Numbers">Numbers</label>
            <input
              checked={numbers}
              onClick={(e) => setNumbers(e.target.checked)}
              type='checkbox' name="Numbers" id="Numbers"
            />
          </div>

          {/* ************************ Symbols **************************** */}
          <div className='form'>
            <label htmlFor="Symbols">Symbols</label>
            <input
              checked={symbols}
              onClick={(e) => setSymbols(e.target.checked)}
              type='checkbox' name="Symbols" id="Symbols"
            />
          </div>

          <button onClick={handleGeneratePassword} className='generate-password'> Generate Password</button>

          <ToastContainer
            position="bottom-right"
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
      </div>
    </div>
  );
}

export default App;
