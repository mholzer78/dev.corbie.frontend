import { CommonModule } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'input-range',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-range.html',
  styleUrl: './input-range.scss',
})
export class InputRange {
  initRange = input.required<{ min: number; max: number }>();
  sliderMax = input.required<number>();
  slider = signal<number>(0);
  slider1 = signal<number>(0);
  slider2 = signal<number>(0);
  minValue = computed(() => Math.min(this.slider1(), this.slider2()));
  maxValue = computed(() => Math.max(this.slider1(), this.slider2()));
  progressGradient = computed(() => {
    return (
      'linear-gradient(90deg,rgba(0, 0, 0, 0.65) ' +
      (100 / this.sliderMax()) * this.minValue() +
      '%, rgba(0, 0, 0, 0) ' +
      (100 / this.sliderMax()) * this.minValue() +
      '%, rgba(0, 0, 0, 0) ' +
      (100 / this.sliderMax()) * this.maxValue() +
      '%, rgba(0, 0, 0, 0.65) ' +
      (100 / this.sliderMax()) * this.maxValue() +
      '%)'
    );
  });
  changeInput = output<{ min: number; max: number }>();

  ngOnInit(): void {
    this.slider1.set(Math.min(this.initRange().min, this.initRange().max));
    this.slider2.set(Math.max(this.initRange().min, this.initRange().max));
  }

  changeValue() {
    this.changeInput.emit({ min: this.minValue(), max: this.maxValue() });
  }
}
