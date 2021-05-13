import { Component } from '@angular/core';
import { SubbannerService } from 'src/app/shared/services/subbanner.service';

@Component({
    selector: 'app-block-banner',
    templateUrl: './block-banner.component.html',
    styleUrls: ['./block-banner.component.scss']
})
export class BlockBannerComponent {
    dashbanner:any;

    constructor( private subbanner:SubbannerService) {
        this.getSubbaner();
     }

    getSubbaner(){
        this.subbanner.getSubBanner().subscribe(banner=>{
            console.log(banner);
            const random = this.randomInteger(0,banner.length-1);
            console.log(random);
            const maxvalue = banner.length;
            console.log(maxvalue);
            
            this.dashbanner = banner[random];

        });
    }

    randomInteger(min, max) {
        // now rand is from  (min-0.5) to (max+0.5)
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
      }

}
