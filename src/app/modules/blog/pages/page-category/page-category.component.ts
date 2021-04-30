import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Post } from '../../../../shared/interfaces/post';
import { posts } from '../../../../../data/blog-posts';

@Component({
    selector: 'app-category',
    templateUrl: './page-category.component.html',
    styleUrls: ['./page-category.component.scss']
})
export class PageCategoryComponent implements OnDestroy {
    private destroy$: Subject<void> = new Subject();

    sidebarPosition: 'start'|'end' = 'end'; // For LTR scripts "start" is "left" and "end" is "right"
    layout: 'classic'|'grid'|'list' = 'classic';

    posts: Post[] = posts;


    // takeUntil(this.destroy$)).subscribe(data => {
    //     this.sidebarPosition = data.sidebarPosition;
    //     this.layout = data.layout;
    // })    pipe params;
     constructor(private route: ActivatedRoute, private router:Router) {
        this.route.params;
        console.log(this.route.params);
    }

    goToCategory(slug): void {
        console.log('Hello Friends');
        this.router.navigateByUrl('shop/catalog/' + slug);
        console.log(slug);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
