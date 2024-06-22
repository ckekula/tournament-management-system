import { Component } from '@angular/core';
import { CompService } from '../../../../services/services';
import { Router } from '@angular/router';
import { PageResponseCompResponse } from '../../../../services/models';
import { CompResponse } from '../../../../services/models';

@Component({
  selector: 'app-comp-list',
  templateUrl: './comp-list.component.html',
  styleUrl: './comp-list.component.scss'
})
export class CompListComponent {

  compResponse: PageResponseCompResponse = {};
  page = 0;
  size = 5;
  pages: any = [];
  message = '';
  level: 'success' |'error' = 'success';

  constructor(
    private compService: CompService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findAllComps();
  }

  private findAllComps() {
    this.compService.findAllComps({
      page: this.page,
      size: this.size
    })
      .subscribe({
        next: (comps) => {
          this.compResponse = comps;
          this.pages = Array(this.compResponse.totalPages)
            .fill(0)
            .map((x, i) => i);
        }
      });
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllComps();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllComps();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllComps();
  }

  goToLastPage() {
    this.page = this.compResponse.totalPages as number - 1;
    this.findAllComps();
  }

  goToNextPage() {
    this.page++;
    this.findAllComps();
  }

  get isLastPage() {
    return this.page === this.compResponse.totalPages as number - 1;
  }

  displayCompDetails(comp: CompResponse) {
    this.router.navigate(['comps', 'details', comp.id]);
  }

}
