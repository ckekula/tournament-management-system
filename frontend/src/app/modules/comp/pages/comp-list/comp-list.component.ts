import { Component } from '@angular/core';
import { CompService } from '../../../../services/services';
import { Router } from '@angular/router';
import { PageResponseCompResponse } from '../../../../services/models';

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
        next: (books) => {
          this.compResponse = books;
          this.pages = Array(this.compResponse.totalPages)
            .fill(0)
            .map((x, i) => i);
        }
      });
  }
}
