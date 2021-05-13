import { Component } from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.sass']
})
export class LayoutComponent {
    links: {label: string; url: string}[] = [
        {label: 'Dashboard', url: './dashboard'},
     
        {label: 'Order History', url: './orders'},
 
        {label: 'Addresses', url: './addresses'},
       
        {label: 'Chat',url:'/password'}
    ];

    constructor() { }
}
