import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class ShareWalletFormService {

  constructor(private fb: FormBuilder, ) { }

  private shareWalletValues = {
    'email': '',
    'wallet': ''
  };

  public shareWalletForm = this.getShareWalletForm();

  public changeShareWalletForm = function (name, value) {
    this.shareWalletForm.controls[name].patchValue(value);
  }

  public getShareWalletForm() {
    return this.shareWalletForm = this.fb.group({
      'uid': ['', Validators.required],
      'wallet': ''
    });
  }

}
