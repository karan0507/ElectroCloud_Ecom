import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-merchantcontact',
  templateUrl: './merchantcontact.component.html',
  styleUrls: ['./merchantcontact.component.scss']
})
export class MerchantcontactComponent implements OnInit {
@Input() merchantinfo:any;

  constructor() { 
    
  }

  ngOnInit(): void {
  }

}
