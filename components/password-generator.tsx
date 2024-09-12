'use client';

import { useState, ChangeEvent } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

export default function GeneratePasswordComponent() {
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');

  const handleLengthChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setLength(Number(e.target.value));
  };

  const generatePassword = (): void => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let allChars = '';
    if (includeUppercase) allChars += uppercaseChars;
    if (includeLowercase) allChars += lowercaseChars;
    if (includeNumbers) allChars += numberChars;
    if (includeSymbols) allChars += symbolChars;

    if (allChars === '') {
      alert('Please select at least one character type.');
      return;
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      generatedPassword += allChars[randomIndex];
    }
    setPassword(generatedPassword);
  };

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(password).then(
      () => {
        alert('Password copied to clipboard!');
      },
      () => {
        alert('Failed to copy password to clipboard.');
      },
    );
  };

  const handleCheckboxChange =
    (setter: (value: boolean) => void) =>
    (checked: boolean): void => {
      if (typeof checked === 'boolean') {
        setter(checked);
      }
    };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
      style={{
        background: `url("https://preview.redd.it/8k-dark-wallpaper-7680-4320-v0-tmxyw1pfnll81.png?width=1080&crop=smart&auto=webp&s=376a29300eea170d27046e471aaafee6c6a22f99") no-repeat center center/cover`,
      }}
    >
      <Card
        className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl"
        style={{
          background: `linear-gradient(135deg,rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url("https://images.pexels.com/photos/3308588/pexels-photo-3308588.jpeg?auto=compress&cs=tinysrgb&w=600") no-repeat center center/cover`,
        }}
      >
        <div className="mx-auto max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Password Generator</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Create a secure password with just a few clicks.
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="length">Password Length</Label>
              <Input
                id="length"
                type="number"
                min="8"
                max="32"
                value={length}
                onChange={handleLengthChange}
                className="w-full"
                style={{ borderRadius: '16px', backgroundColor: '#ffffff' }}
              />
            </div>
            <div className="space-y-2">
              <Label>Include:</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="uppercase"
                  checked={includeUppercase}
                  onCheckedChange={handleCheckboxChange(setIncludeUppercase)}
                />
                <Label htmlFor="uppercase">Uppercase Letters</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lowercase"
                  checked={includeLowercase}
                  onCheckedChange={handleCheckboxChange(setIncludeLowercase)}
                />
                <Label htmlFor="lowercase">Lowercase Letters</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="numbers"
                  checked={includeNumbers}
                  onCheckedChange={handleCheckboxChange(setIncludeNumbers)}
                />
                <Label htmlFor="numbers">Numbers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="symbols"
                  checked={includeSymbols}
                  onCheckedChange={handleCheckboxChange(setIncludeSymbols)}
                />
                <Label htmlFor="symbols">Symbols</Label>
              </div>
            </div>
            <Button
              type="button"
              className="w-full"
              onClick={generatePassword}
              style={{ borderRadius: '16px' }}
            >
              Generate Password
            </Button>
            <div className="space-y-2">
              <Label htmlFor="password">Generated Password</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="password"
                  type="text"
                  value={password}
                  readOnly
                  className="flex-1"
                  style={{ borderRadius: '16px', backgroundColor: '#ffffff' }}
                />
                <Button
                  type="button"
                  onClick={copyToClipboard}
                  style={{ borderRadius: '16px' }}
                >
                  Copy to Clipboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
