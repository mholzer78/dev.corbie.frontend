import { Component, computed, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { min } from 'rxjs';

@Component({
  selector: 'section[convertTime]',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './convert-time.html',
  styleUrl: './convert-time.scss',
})
export class ConvertTimeComponent {
  slider1 = signal(1);
  slider2 = signal(4);
  minValue = computed(() => Math.min(this.slider1(), this.slider2()));
  maxValue = computed(() => Math.max(this.slider1(), this.slider2()));
  inputVal = ['6', '5', '4', '3', '2', '1'];
  inputText = '';
  outputVal = ['', '', '', '', '', ''];
  outputTextArea = '';
  timeSlots = ['Weeks', 'Days', 'Hours', 'Minutes', 'Seconds', 'Milliseconds'];
  multiplier = [604800000, 86400000, 3600000, 60000, 1000, 1];

  changeValue() {
    let inputInt = this.inputVal.map((val) => {
      let intVal = parseInt(val);
      return isNaN(intVal) ? 0 : intVal;
    });
    let ms = 0;
    this.outputTextArea = '';

    inputInt.forEach((val, index) => {
      ms += val * this.multiplier[index];
    });

    this.inputText = new Date(ms).toUTCString().split(' ')[4];
    this.inputText = this.inputText + '-' + ms.toString().slice(-3);
    if (this.inputVal[1] !== '' && this.inputVal[1] !== '0')
      this.inputText = this.inputVal[1] + 'd ' + this.inputText;
    if (this.inputVal[0] !== '' && this.inputVal[0] !== '0')
      this.inputText = this.inputVal[0] + 'w ' + this.inputText;

    this.inputVal.forEach((val, index) => {
      let result = 0;
      if (this.isBetween(index)) {
        if (this.isBetween(index + 1)) {
          result = Math.floor(ms / this.multiplier[index]);
          ms -= result * this.multiplier[index];
        } else {
          result = ms / this.multiplier[index];
        }
        this.outputVal[index] = result.toString();
      } else {
        this.outputVal[index] = '';
      }
    });
    this.outputVal.forEach((val, index) => {
      if (val !== '') {
        this.outputTextArea += val + ' ' + this.timeSlots[index];
        if (this.isBetween(index + 1)) {
          this.outputTextArea += '\n';
        }
      }
    });
  }

  isBetween(index: number): boolean {
    return index >= this.minValue() && index <= this.maxValue();
  }
}
