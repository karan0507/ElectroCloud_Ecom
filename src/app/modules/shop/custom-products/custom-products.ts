import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: ' ',
  templateUrl: './custom-products.component.html',
  styleUrls: ['./custom-products.component.scss']
})
export class CustomProductsComponent implements OnInit {

  isSubmitted = false;

  // City Names
  City: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan', 'New York']

  constructor(public fb: FormBuilder) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  /*########### Form ###########*/
  registrationForm = this.fb.group({
    cityName: ['', [Validators.required]]
  })

  // Getter method to access formcontrols
  get cityName() {
    return this.registrationForm.get('cityName');
  }

  /*########### Template Driven Form ###########*/
  onSubmit() {
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      return false;
    } else {
      alert(JSON.stringify(this.registrationForm.value))
    }

  }

}