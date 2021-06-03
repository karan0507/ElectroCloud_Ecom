import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MobileMenuItem } from '../../../../shared/interfaces/mobile-menu-item';

@Component({
    selector: 'app-mobile-links',
    templateUrl: './mobile-links.component.html',
    styleUrls: ['./mobile-links.component.scss']
})
export class MobileLinksComponent {
    
    @Input() links: MobileMenuItem[] = [];
    @Input() level = 0;

    @Output() itemClick: EventEmitter<MobileMenuItem> = new EventEmitter();
    islogin:boolean;
    constructor(private route:Router) {
        this.islogin = JSON.parse(localStorage.getItem('loggedIn'));
        console.log('Here is your local', this.islogin);
        setTimeout(()=>{

            // this.links.login = JSON.parse(localStorage.getItem('loggedIn'));
        console.log('You are in mobile view', this.links);
        })
     }

    onItemClick(item: MobileMenuItem): void {
        this.itemClick.emit(item);
    }
    login(){
        this.route.navigateByUrl('/login');
    }
}
