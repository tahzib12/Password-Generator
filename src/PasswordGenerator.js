import React, { useState } from 'react';
import './PasswordGenerator.css';

const PasswordGenerator = () => {
    const [password, setPassword] = useState('');
    const [copyStatus, setCopyStatus] = useState('Copy');
    const [options, setOptions] = useState({
        lowercase: false,
        uppercase: false,
        numbers: false,
        symbols: false,
        excludeDuplicate: false,
        includeSpaces: false
    });

    const generatePassword = () => {
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numberChars = '0123456789';
        const symbolChars = '!@$%^&*()_+~`|}{[]:;?><,./-=';
        let allChars = '';
        if (options.lowercase) allChars += lowercaseChars;
        if (options.uppercase) allChars += uppercaseChars;
        if (options.numbers) allChars += numberChars;
        if (options.symbols) allChars += symbolChars;
        if (options.includeSpaces) allChars += ' ';

        let generatedPassword = '';
        const charArray = allChars.split('');
        const usedChars = {};

        for (let i = 0; i < 12; i++) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * charArray.length);
            } while (options.excludeDuplicate && usedChars[charArray[randomIndex]]);

            generatedPassword += charArray[randomIndex];
            usedChars[charArray[randomIndex]] = true;
        }

        setPassword(generatedPassword);
        setCopyStatus('Copy'); // Reset button text when new password is generated
    };

    const handleChange = (e) => {
        const { name, checked } = e.target;
        setOptions(prevState => ({ ...prevState, [name]: checked }));
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(password);
        setCopyStatus('Copied');
        setTimeout(() => setCopyStatus('Copy'), 3000); // Revert back to "Copy" after 2 seconds
    };

    return (
        <div className="password-generator">
            <h2>Password Generator</h2>
            <div className="password-display">
                <input type="text" value={password} readOnly />
                <button onClick={handleCopy}>{copyStatus}</button>
            </div>
            <div className="options">
                <label>
                    <input type="checkbox" name="lowercase" checked={options.lowercase} onChange={handleChange} />
                    Lowercase (a-z)
                </label>
                <label>
                    <input type="checkbox" name="uppercase" checked={options.uppercase} onChange={handleChange} />
                    Uppercase (A-Z)
                </label>
                <label>
                    <input type="checkbox" name="numbers" checked={options.numbers} onChange={handleChange} />
                    Numbers (0-9)
                </label>
                <label>
                    <input type="checkbox" name="symbols" checked={options.symbols} onChange={handleChange} />
                    Symbols (!@$%^&*)
                </label>
                <label>
                    <input type="checkbox" name="excludeDuplicate" checked={options.excludeDuplicate} onChange={handleChange} />
                    Exclude Duplicate
                </label>
                <label>
                    <input type="checkbox" name="includeSpaces" checked={options.includeSpaces} onChange={handleChange} />
                    Include Spaces
                </label>
            </div>
            <button className="generate-button" onClick={generatePassword}>Generate Password</button>
        </div>
    );
};

export default PasswordGenerator;
