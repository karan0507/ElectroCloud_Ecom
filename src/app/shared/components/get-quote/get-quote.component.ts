import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-quote',
  templateUrl: './get-quote.component.html',
  styleUrls: ['./get-quote.component.scss']
})
export class GetQuoteComponent implements OnInit {

options:Array<string> = ['IS','IEC','ANSI','CBIP','SANS','EU ECO','GOST','WAPDA'];
cooling:Array<string> = ['ONAN','ONAF','OFAF','ANAN(VPI)','ANAF(VPI)','ANAN(CRT)','ANAF(CRT)','KNAN'];
vectors:Array<string> = ['Dd0','Dd10','Dy11','Dyn1','Dyn5','YNd1','YNd11','YNyn0','YNyn6','Y40','Any Other'];
tappingtype:Array<string> = ['NA','OCTC','OLTC'];
material_type:Array<string>=['Copper','Aluminium'];
@Input() category:any;  
isCategory:boolean;
select_opt:boolean = true;
isUpload:boolean;
isManually:boolean;
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
    this.select_opt = true;
  }
manually(){
this.select_opt = false;
this.isManually = true;
this.isUpload = false;
}
onDestroy():void{
this.isManually = false;
this.isUpload = false;
}
upload(){
  this.select_opt = false;
  this.isUpload = true;
  this.isManually = false;
}
cancel(){
  this.select_opt = true;
 this.isManually = false;
}
cancelUp(){
  this.select_opt = true;
 this.isUpload = false;
}
}
