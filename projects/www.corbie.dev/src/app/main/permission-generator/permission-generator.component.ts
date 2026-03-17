import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Clipboard } from '@libs/clipboard';

import { Icons } from '@libs/icons';
import { SiteBlueprint } from '../SiteBlueprint';

const convert = [
  {
    symbol: 'r',
    octal: 400,
  },
  {
    symbol: 'w',
    octal: 200,
  },
  {
    symbol: 'x',
    octal: 100,
  },
  {
    symbol: 'r',
    octal: 40,
  },
  {
    symbol: 'w',
    octal: 20,
  },
  {
    symbol: 'x',
    octal: 10,
  },
  {
    symbol: 'r',
    octal: 4,
  },
  {
    symbol: 'w',
    octal: 2,
  },
  {
    symbol: 'x',
    octal: 1,
  },
];

@Component({
  selector: 'section[permissionGenerator]',
  standalone: true,
  imports: [FormsModule, Clipboard, Icons],
  templateUrl: './permission-generator.component.html',
  styleUrl: './permission-generator.component.scss',
})
export class PermissionGeneratorComponent extends SiteBlueprint implements OnInit, OnDestroy {
  permBool = signal(new Array<boolean>(9));
  permSymbolic = signal('');
  permOctal = signal('');

  ngOnInit(): void {
    let storage = this.getStorage('permission');
    this.permBool.set(storage.bool);
    this.changePermSymbolic();
    this.changePermOctal();
  }

  ngOnDestroy(): void {
    this.store2storage();
  }

  store2storage() {
    this.setStorage('permission', { bool: this.permBool() });
  }

  onChangeBool(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    let index = (event.target as HTMLInputElement).dataset['index'];
    let tempArray = this.permBool();
    tempArray[+index!] = value !== 'true';
    this.permBool.set([...tempArray]);
    this.changePermSymbolic();
    this.changePermOctal();
    this.store2storage();
  }

  onChangeOctal(event: string) {
    let value = Number.parseInt(event);
    let tempArray: boolean[] = [];
    convert.forEach((convertItem, index: number) => {
      if (value - convertItem.octal >= 0) {
        tempArray[index] = true;
        value -= convertItem.octal;
      } else {
        tempArray[index] = false;
      }
    });
    this.permBool.set(tempArray);
    this.changePermSymbolic();
  }

  onChangeSymbolic(event: string) {
    let value = event.split('');
    let tempArray: boolean[] = [];
    while (value.length > 9) {
      value.shift();
    }
    while (value.length < 9) {
      value.unshift('-');
    }
    value.forEach((char, index) => {
      tempArray[index] = char !== '-';
    });
    this.permBool.set(tempArray);
    this.changePermOctal();
  }

  inputCleanup(event: Event) {
    this.changePermSymbolic();
    this.changePermOctal();
  }

  changePermSymbolic() {
    let tempSymbolic: string = '-';
    this.permBool().forEach((item: boolean, index: number) => {
      if (item) {
        tempSymbolic += convert[index].symbol;
      } else {
        tempSymbolic += '-';
      }
    });
    this.permSymbolic.set(tempSymbolic);
  }

  changePermOctal() {
    let tempOctal: number = 0;
    this.permBool().forEach((item: boolean, index: number) => {
      if (item) {
        tempOctal += convert[index].octal;
      }
    });
    let tempString = '000' + tempOctal;
    this.permOctal.set(tempString.substring(tempString.length - 3));
  }
}
