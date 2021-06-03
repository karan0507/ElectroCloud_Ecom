export interface MobileMenuItemBase {
    label: string;
    data?: any;
    login?:boolean;
    children?: MobileMenuItem[];
}

export interface MobileMenuItemLink extends MobileMenuItemBase {
    type: 'link';
    url: string;
}

export interface MobileMenuItemButton extends MobileMenuItemBase {
    type: 'button';
}

export type MobileMenuItem = MobileMenuItemLink | MobileMenuItemButton;
