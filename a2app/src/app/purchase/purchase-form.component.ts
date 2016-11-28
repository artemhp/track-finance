import { Component } from '@angular/core';
import { Purchase }    from './purchase';
@Component({
  selector: 'purchase-form',
  templateUrl: 'purchase-form.component.html'
})
export class PurchaseFormComponent {
  powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];
  model = new Purchase('1', 2, '3', '4', '5', '6', '7');
  submitted = false;
  onSubmit() { this.submitted = true; }
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}