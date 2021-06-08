import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { instrumentAngularRouting } from '@sentry/angular';
import { HomeCommonService } from 'src/app/shared/services/home-common.service';
import { MobileMenuItem } from '../../../../shared/interfaces/mobile-menu-item';

@Component({
    selector: 'app-mobile-links',
    templateUrl: './mobile-links.component.html',
    styleUrls: ['./mobile-links.component.scss']
})
export class MobileLinksComponent implements OnInit {

    @Input() links: MobileMenuItem[] = [];
    @Input() level = 0;
    categoriesName = [];
    temp: Object;
    @Output() itemClick: EventEmitter<MobileMenuItem> = new EventEmitter();
    islogin: boolean;
    constructor(private route: Router, private changeDetect: ChangeDetectorRef, private common: HomeCommonService) {
      

    }
    ngOnInit(): void {
        this.islogin = JSON.parse(localStorage.getItem('loggedIn'));
        this.common.getCategory().subscribe(category => {
            console.log('Empty', category);
            category.categories.forEach(element => {


                this.temp = { type: 'link', label: element.category_name, url: '/shop/catalog/' + element.slug };
                this.categoriesName.push((this.temp));

            });
            // console.log(this.temp);
            // this.categories = [this.temp];
            console.log(this.categoriesName, "Here we GO=o ", this.temp);

        })
        // console.log('Here is your local', this.islogin);
        setTimeout(() => {


            if (JSON.parse(localStorage.getItem('loggedIn'))) {
                this.links.forEach((key) => {
                    if (key["label"] === "Categories") {
                        console.log('You got it wrong', key);
                        key.children = this.categoriesName;
                        console.log(key.children);


                    }
                })


            } else {
                this.islogin = false;
                this.links.pop();
                console.log(this.links);

            }
            // this.links.login = JSON.parse(localStorage.getItem('loggedIn'));
            console.log('You are in mobile view', this.links);
        });
    }


    onItemClick(item: MobileMenuItem): void {
        if (item.label === "Logout" && localStorage.getItem('loggedIn')) {

            console.log(item.label + 'You Got These' + localStorage.getItem('loggedIn'));
            this.logout();
        }
        this.itemClick.emit(item);
        console.log(item);
    }
    login() {
        this.route.navigateByUrl('/login');
    }
    logout() {
        localStorage.removeItem('cartItems');
        localStorage.removeItem('token');
        localStorage.setItem('loggedIn', 'false');
        localStorage.removeItem('customer_id');
        localStorage.removeItem('user_id');
        localStorage.removeItem('customer_name');
        // this.islogin = false;
        this.changeDetect.detectChanges();
        this.ngOnInit();

    }
}
