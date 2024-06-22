import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CompResponse} from '../../../../services/models/comp-response';

@Component({
  selector: 'app-comp-card',
  templateUrl: './comp-card.component.html',
  styleUrls: ['./comp-card.component.scss']
})
export class CompCardComponent {
  private _comp: CompResponse = {};
  private _manage = false;
  private _compBanner: string | undefined;

  get compBanner(): string | undefined {
    if (this._comp.banner) {
      return 'data:image/jpg;base64,' + this._comp.banner
    }
    return 'https://source.unsplash.com/user/c_v_r/1900x800';
  }

  get comp(): CompResponse {
    return this._comp;
  }

  @Input()
  set comp(value: CompResponse) {
    this._comp = value;
  }


  get manage(): boolean {
    return this._manage;
  }

  @Input()
  set manage(value: boolean) {
    this._manage = value;
  }

  @Output() private edit: EventEmitter<CompResponse> = new EventEmitter<CompResponse>();
  @Output() private details: EventEmitter<CompResponse> = new EventEmitter<CompResponse>();

  onEdit() {
    this.edit.emit(this._comp);
  }

  onShowDetails() {
    this.details.emit(this._comp);
  }
}
