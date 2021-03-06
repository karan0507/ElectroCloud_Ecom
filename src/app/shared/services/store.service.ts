import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    address = '715 Fake Street, New York 10021 USA';
    email = 'electrocloud@example.com';
    phone = ['(9561) 555-479'];
    hours = 'Mon-Sat 10:00pm - 7:00pm';

    get primaryPhone(): string|null {
        return this.phone.length > 0 ? this.phone[0] : null;
    }

    constructor() { }
}
