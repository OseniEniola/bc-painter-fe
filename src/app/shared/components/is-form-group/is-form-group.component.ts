import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'is-form-group',
  templateUrl: './is-form-group.component.html',
  styleUrls: ['./is-form-group.component.scss']
})
export class IsFormGroupComponent implements OnInit, OnChanges {

  @Input()
  label: string;

  @Input()
  isEditable = true;
  @Input()
  control: AbstractControl;
  @Input()
  isObject = false;
  @Input()
  value: string;
  @Input()
  currency: string;
  @Input()
  required: boolean;
  @Input()
  labelCls: string;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }
}
