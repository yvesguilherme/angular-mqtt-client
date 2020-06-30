import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[mqttExampleDirective]'
})
export class ExampleDirectiveDirective {

  constructor(elementRef: ElementRef) {
    elementRef.nativeElement.style.backgroundColor = '#000';
  }

}
