import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-quote',
  templateUrl: './get-quote.component.html',
  styleUrls: ['./get-quote.component.scss']
})
export class GetQuoteComponent implements OnInit {

options:Array<string> = ['IS','IEC','ANSI','CBIP','SANS','EU ECO','GOST','WAPDA'];
cooling:Array<string> = ['ONAN','ONAF','OFAF','ANAN(VPI)','ANAF(VPI)','ANAN(CRT)','ANAF(CRT)','KNAN'];
@Input() category:any;  
isCategory:boolean;
select_opt:boolean = true;
isUpload:boolean = false;
isManually:boolean = false;
constructor() { 
  setTimeout(() => {
    console.log(this.category); 
    if(this.category === 'Transformer' || this.category === 'transformer' || this.category === 'trctyas'){
   this.isCategory = true;
   }else{
     this.isCategory = false;
       console.log(this.isCategory);
   }
  
 });
 
}

  ngOnInit(): void {
  }
manually(){
this.select_opt = false;
this.isManually = true;
}
upload(){
  this.select_opt = false;
  this.isUpload = true;
}

}
