import {Component, OnInit} from '@angular/core';
import {CompRequest} from '../../../../services/models/comp-request';
import {CompService} from '../../../../services/services/comp.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-manage-comp',
  templateUrl: './manage-comp.component.html',
  styleUrls: ['./manage-comp.component.scss']
})
export class ManageCompComponent implements OnInit {

  errorMsg: Array<string> = [];
  compRequest: CompRequest = {
    name: '',
    host: '',
    startDate: '',
    endDate: ''
  };
  selectedCompBanner: any;
  selectedPicture: string | undefined;

  constructor(
    private compService: CompService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const compId = this.activatedRoute.snapshot.params['compId'];
    if (compId) {
      this.compService.findCompById({
        'comp-id': compId
      }).subscribe({
        next: (comp) => {
         this.compRequest = {
           id: comp.id,
           name: comp.name as string,
           host: comp.host as string,
           startDate: comp.startDate as string,
           endDate: comp.endDate as string,
         };
         this.selectedPicture='data:image/jpg;base64,' + comp.banner;
        }
      });
    }
  }

  saveComp() {
    this.compService.saveComp({
      body: this.compRequest
    }).subscribe({
      next: (compId) => {
        this.compService.uploadCompBannerPicture({
          'comp-id': compId,
          body: {
            file: this.selectedCompBanner
          }
        }).subscribe({
          next: () => {
            this.router.navigate(['/comps/my-comps']);
          }
        });
      },
      error: (err) => {
        console.log(err.error);
        this.errorMsg = err.error.validationErrors;
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedCompBanner = event.target.files[0];
    console.log(this.selectedCompBanner);

    if (this.selectedCompBanner) {

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(this.selectedCompBanner);
    }
  }
}
