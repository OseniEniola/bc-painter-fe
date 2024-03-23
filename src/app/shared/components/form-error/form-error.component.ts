import { Component, Input } from '@angular/core';
import { AbstractControl, AbstractControlDirective } from '@angular/forms';

@Component({
  selector: 'is-form-error',
  template: `
    <div style="font-size: 0.7rem" class="help-block errors text-danger animated shake" *ngIf="shouldShowErrors()"> {{ getError() }}</div>
  `,
  styles: []
})
export class FormErrorComponent {

  static readonly errorMessages = {
    required: (params: any) => '##FIELD## is required *',
    minlength: (params: any) => '##FIELD## should be minimum ' + params.requiredLength + ' characters',
    maxlength: (params: any) => '##FIELD## should not be greater than ' + params.requiredLength + ' characters',
    pattern: (params: any) => 'Should be a valid ##FIELD## ',
    email: (params: any) => 'Invalid email *',
    vaildEmail: (params: any) => 'Invalid email',
    specialCharacter: (params: any) => 'No Special Characters are Allowed *',
    startsWith: (params: any) => '##FIELD## must start with ' + params.value,
    numberOnly: (params: any) => 'Only Numbers are allowed *',
    letterOnly: (params: any) => 'Only Letters are allowed *',
    min: (params: any) => '##FIELD## minimum character is ' + params.minValue,
    max: (params: any) => '##FIELD## maximum character is ' + params.maxValue,
    minDate: (params: any) => 'Date must be after the selected date',
    maxDate: (params: any) => 'Date must be before the selected date ',
    shouldBe: (params: any) => '##FIELD## must be ' + params.num + ' characters',
    shouldBeEqual: (params: any) => 'Confirm password must match password',
    confirmPassword: (params: any) => 'Passwords must match *',
    alphaDash: (params: any) => 'Enter valid name *',
    customMessage: (params: any) => params.value
  };

  @Input() control: AbstractControlDirective | AbstractControl | null;
  @Input() label: string;

  shouldShowErrors(): boolean| null {
    return this.control && this.control.errors && (this.control.dirty || this.control.touched);
  }

  getError(): string {
    if (!this.control || !this.control.errors) {
      return '';
    }
    const errors = Object.keys(this.control.errors).map(field =>
      this.getMessage(field, this.control?.errors?.[field], this.control));
    return errors.length > 0 ? errors[0] : '';
  }

  private getMessage(type: string, params: any, control: any): string {
    let fieldName = this.label ? this.label : this.getControlName(control);
    if (fieldName != null) {
      fieldName = fieldName.replace(/([A-Z])/g, (match) =>
        ` ${match}`).replace(/^./, (match) => match.toUpperCase());
    }
    const msg = (FormErrorComponent.errorMessages as { [key: string]: (params: any) => string })[type](params);
    return msg.replace('##FIELD##', <string>fieldName);
  }

  getControlName(c: AbstractControl): string | null {
    const formGroup = c.parent?.controls;

    if (!formGroup) {
      return null;
    }

    if (Array.isArray(formGroup)) {
      const controlIndex = formGroup.indexOf(c);
      return controlIndex !== -1 ? controlIndex.toString() : null;
    }

    return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
  }

}
