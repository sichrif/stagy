import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-add-licence',
  templateUrl: './add-licence.component.html',
  styleUrls: ['./add-licence.component.css']
})

export class AddLicenceComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetLicenceForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  licenceForm: FormGroup;
  subjectArray: Subject[] = [];
  SectioinArray: any = ['A', 'B', 'C', 'D', 'E'];

  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private licenceApi: ApiService
  ) { }

  /* Reactive book form */
  submitBookForm() {
    this.licenceForm = this.fb.group({
      enseigne: ['', [Validators.required]],
      siret: ['', [Validators.required]],
      code_naf: ['', [Validators.required]],
      numero_tva: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      code_postal: ['', [Validators.required]],
      ville: ['', [Validators.required]],
      pays: ['', [Validators.required]],
      nombre_postes: ['', [Validators.required]],
      duree_utilisation: ['', [Validators.required]],
      client_email: ['', [Validators.required]],
      client_pwd: ['', [Validators.required]],
      etat: ['', [Validators.required]],
      site: ['', [Validators.required]],
      exercice: ['', [Validators.required]],
       
    })
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.subjectArray.length < 5) {
      this.subjectArray.push({ name: value.trim() })
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Remove dynamic languages */
  remove(subject: Subject): void {
    const index = this.subjectArray.indexOf(subject);
    if (index >= 0) {
      this.subjectArray.splice(index, 1);
    }
  }  
 
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.licenceForm.controls[controlName].hasError(errorName);
  }  

  /* Submit book */
  submitLicenceForm() {
    if (this.licenceForm.valid) {
      this.licenceApi.AddLicence(this.licenceForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/licences-list'))
      });
    }
  }

}