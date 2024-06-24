import {Component, OnInit} from '@angular/core';
import {PageResponseCompResponse} from '../../../../services/models/page-response-comp-response';
import {CompService} from '../../../../services/services/comp.service';
import {CompResponse} from '../../../../services/models/comp-response';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-comps',
  templateUrl: './my-comps.component.html',
  styleUrls: ['./my-comps.component.scss']
})
export class MyCompsComponent implements OnInit {

  compResponse: PageResponseCompResponse = {};
  page = 0;
  size = 5;
  pages: any = [];

  constructor(
    private compService: CompService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findAllComps();
  }

  private findAllComps() {
    this.compService.findAllCompsByOwner({
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

  editComp(comp: CompResponse) {
    this.router.navigate(['comps', 'manage', comp.id]);
  }
}
