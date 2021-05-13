import { Component } from '@angular/core';
import { from } from 'rxjs';
import { DirectionService } from '../../../../shared/services/direction.service';
import {MatExpansionModule} from '@angular/material/expansion';
@Component({
    selector: 'app-about-us',
    templateUrl: './page-about-us.component.html',
    styleUrls: ['./page-about-us.component.scss']
})
export class PageAboutUsComponent {
    carouselOptions = {
        nav: false,
        dots: true,
        responsive: {
            580: {items: 3, margin: 32},
            280: {items: 2, margin: 24},
            0: {items: 1}
        },
        rtl: this.direction.isRTL()
    };
    panelOpenState = false;

    constructor(
        private direction: DirectionService
    ) { }
}
