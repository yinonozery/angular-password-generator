import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {
  constructor(private snackBar: MatSnackBar) { }

  title = 'PasswordGenerator';
  useLettersLower: boolean = false;
  useLettersUpper: boolean = false;
  useNumbers: boolean = false;
  useSymbols: boolean = false;
  buttonDisabled: boolean = false;
  length: number = 0;
  password: string | null = null;

  generatePassword = () => {
    const numbers = '1234567890';
    const letters_lower = 'abcdefghijklmnopqrstuvwxyz';
    const letters_upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const symbols = '!@#$%^&*()';
    let validChars: string = '', password: string = '';

    validChars += this.useLettersLower ? letters_lower : '';
    validChars += this.useLettersUpper ? letters_upper : '';
    validChars += this.useNumbers ? numbers : '';
    validChars += this.useSymbols ? symbols : '';

    for (let i = 0; i < this.length; i++) {
      const index = Math.floor(Math.random() * validChars.length);
      password += validChars[index];
    }
    return password;
  }

  onButtonClick = (): void => {
    console.log(`Generating a password with the following:
    Length: ${this.length}
    Uppercase Letters: ${this.useLettersUpper}
    Lowercase Letters: ${this.useLettersLower}
    Numbers: ${this.useNumbers}
    Symbols: ${this.useSymbols}`)
    this.password = this.generatePassword();
  }

  onChangeLength = (target: EventTarget): void => {
    const value = (<HTMLInputElement>target).value;
    const parsedValue = parseInt(value);
    this.length = parsedValue;
  }

  onChangeUseLettersUpper = (): void => {
    this.useLettersUpper = !this.useLettersUpper;
  }

  onChangeUseLettersLower = (): void => {
    this.useLettersLower = !this.useLettersLower;
  }

  onChangeUseNumbers = (): void => {
    this.useNumbers = !this.useNumbers;
  }

  onChangeUseSymbols = (): void => {
    this.useSymbols = !this.useSymbols;
  }

  copyToClipboard = (): void => {
    navigator.clipboard.writeText(this.password || '');
    this.snackBar.open('Password copied to clipboard', 'OK', {
      duration: 2000,
    });

  }
}
