import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HomeCommonService } from 'src/app/shared/services/home-common.service';
import { DirectionService } from '../../../shared/services/direction.service';

@Component({
    selector: 'app-block-slideshow',
    templateUrl: './block-slideshow.component.html',
    styleUrls: ['./block-slideshow.component.scss']
})
export class BlockSlideshowComponent {
    @Input() withDepartments = false;

    options = {
        nav: false,
        dots: true,
        loop: true,
        responsive: {
            0: {items: 1}
        },
        rtl: this.direction.isRTL()
    };

    slides:any;
    // slides = [
    //     {
    //         title: 'Big choice of<br>Plumbing products',
    //         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Etiam pharetra laoreet dui quis molestie.',
    //         image_classic: 'assets/images/slides/slide-1.jpg',
    //         image_full: 'assets/images/slides/slide-1-full.jpg',
    //         image_mobile: 'assets/images/slides/slide-1-mobile.jpg'
    //     },
    //     {
    //         title: 'Screwdrivers<br>Professional Tools',
    //         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Etiam pharetra laoreet dui quis molestie.',
    //         image_classic: 'assets/images/slides/slide-2.jpg',
    //         image_full: 'assets/images/slides/slide-2-full.jpg',
    //         image_mobile: 'assets/images/slides/slide-2-mobile.jpg'
    //     },
    //     {
    //         title: 'One more<br>Unique header',
    //         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Etiam pharetra laoreet dui quis molestie.',
    //         image_classic: 'assets/images/slides/slide-3.jpg',
    //         image_full: 'assets/images/slides/slide-3-full.jpg',
    //         image_mobile: 'assets/images/slides/slide-3-mobile.jpg'
    //     }
    // ];

    constructor(
        public sanitizer: DomSanitizer,
        private direction: DirectionService,
        private common:HomeCommonService
    ) { 
        this.getbanner();
    }
    getbanner(){
        this.common.getBanner().subscribe(banner => {
            // console.log(banner);
            this.slides = banner;
        })
    }
}
