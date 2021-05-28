import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding, HostListener,
    Inject,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    PLATFORM_ID, ViewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent, merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HeaderService } from '../../../../shared/services/header.service';
import { fromOutsideTouchClick } from '../../../../shared/functions/rxjs/fromOutsideTouchClick';

export type IndicatorTrigger = 'hover' | 'click' | false;

@Component({
    selector: 'app-indicator',
    templateUrl: './indicator.component.html',
    styleUrls: ['./indicator.component.scss'],
    exportAs: 'appIndicator',
})
export class IndicatorComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() trigger: IndicatorTrigger = false;

    @Input() icon: string;

    @Input() iconWhenOpen: string = null;

    @Input() link: string = null;

    @Input() counter: number = null;

    @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

    @Output() stateChanges: EventEmitter<boolean> = new EventEmitter<boolean>();

    @HostBinding('class.indicator') classIndicator = true;

    @HostBinding('class.indicator--trigger--click') get classIndicatorTriggerClick() { return this.trigger === 'click'; }

    @HostBinding('class.indicator--trigger--hover') get classIndicatorTriggerHover() { return this.trigger === 'hover'; }

    @ViewChild('dropdownElement') dropdownElementRef: ElementRef;

    isOpen = false;
    isLoggedIn:boolean;

    private destroy$: Subject<any> = new Subject();

    private get element(): HTMLElement {
        return this.elementRef.nativeElement;
    }

    private get dropdownElement(): HTMLDivElement {
        return this.dropdownElementRef.nativeElement;
    }

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private elementRef: ElementRef,
        private zone: NgZone,
        private header: HeaderService,
    ) {
       const check_login = localStorage.getItem('loggedIn');
       if(check_login == 'true'){
           this.isLoggedIn = true;
            console.log('Get Customer Name here',this.isLoggedIn);
       }
       else{
           console.log('something went wrong',this.isLoggedIn);
       }
     }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                fromEvent<MouseEvent>(document, 'mousedown').pipe(
                    takeUntil(this.destroy$)
                ).subscribe((event) => {
                    if (!this.element.contains(event.target as HTMLElement)) {
                        this.zone.run(() => this.close());
                    }
                });
            });
        }

        merge(
            this.header.navPanelPositionState$,
            this.header.navPanelVisibility$,
        ).pipe(
            takeUntil(this.destroy$)
        ).subscribe(() => this.close(true));
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                fromEvent(this.dropdownElement, 'transitionend').pipe(
                    takeUntil(this.destroy$)
                ).subscribe((event: TransitionEvent) => {
                    if (
                        this.dropdownElement === event.target &&
                        event.propertyName === 'visibility' &&
                        !this.isOpen
                    ) {
                        this.element.classList.remove('indicator--display');
                    }
                });

                fromOutsideTouchClick(this.element).pipe(
                    takeUntil(this.destroy$)
                ).subscribe(() => {
                    if (this.isOpen) {
                        this.zone.run(() => this.close());
                    }
                });
            });
        }
    }

    toggle(force?: boolean, immediately = false): void {
        const newValue = force !== undefined ? force : !this.isOpen;

        if (this.isOpen !== newValue) {
            this.isOpen = newValue;

            if (this.isOpen) {
                this.element.classList.add('indicator--display');
                this.element.getBoundingClientRect(); // force reflow
                this.element.classList.add('indicator--open');

                const dropdownTop = this.dropdownElement.getBoundingClientRect().top;
                const viewportHeight = window.innerHeight;
                const paddingBottom = 20;

                this.dropdownElement.style.maxHeight = `${viewportHeight - dropdownTop - paddingBottom}px`;

                if (immediately) {
                    this.dropdownElement.style.transition = 'none';
                    this.dropdownElement.getBoundingClientRect(); // force reflow
                    this.dropdownElement.style.transition = '';
                }
            } else {
                if (immediately) {
                    this.element.classList.remove('indicator--display');
                }

                this.element.classList.remove('indicator--open');
            }

            this.stateChanges.emit(this.isOpen);
        }
    }

    close(immediately = false): void {
        this.toggle(false, immediately);
    }

    open(immediately = false): void {
        this.toggle(true, immediately);
    }

    onClick(event: Event): void {
        this.buttonClick.emit();

        if (this.trigger === 'click') {
            event.preventDefault();

            this.toggle();
        }
    }

    onTouchClick(event): void {
        if (event.cancelable) {
            if (this.trigger !== 'hover' || this.isOpen) {
                return;
            }

            event.preventDefault();

            this.open();
        }
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.element.classList.add('indicator--hover');

        if (this.trigger === 'hover') {
            this.open();
        }
    }

    @HostListener('mouseleave') onMouseleave() {
        this.element.classList.remove('indicator--hover');

        if (this.trigger === 'hover') {
            this.close();
        }
    }
}
