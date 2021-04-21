import { NavigationLink } from '../app/shared/interfaces/navigation-link';

export const departments: NavigationLink[] = [
 
    {label: 'Electrical', url: '/shop/catalog', menu: {
        type: 'menu',
        items: [
            {label: 'Soldering Equipment', url: '/shop/catalog', items: [
                {label: 'Soldering Station', url: '/shop/catalog'},
                {label: 'Soldering Dryers', url: '/shop/catalog'},
                {label: 'Gas Soldering Iron', url: '/shop/catalog'},
                {label: 'Electric Soldering Iron', url: '/shop/catalog'}
            ]},
            {label: 'Light Bulbs', url: '/shop/catalog'},
            {label: 'Batteries', url: '/shop/catalog'},
            {label: 'Light Fixtures', url: '/shop/catalog'},
            {label: 'Warm Floor', url: '/shop/catalog'},
            {label: 'Generators', url: '/shop/catalog'},
            {label: 'UPS', url: '/shop/catalog'}
        ]
    }},
  
];
