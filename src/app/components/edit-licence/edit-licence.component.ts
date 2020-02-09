import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-edit-licence',
  templateUrl: './edit-licence.component.html',
  styleUrls: ['./edit-licence.component.css']
})

export class EditLicenceComponent implements OnInit {
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
    this.updateBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private licenceApi: ApiService
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.licenceApi.GetLicence(id).subscribe(data => {
      console.log(data.subjects)
      this.subjectArray = data.subjects;
      this.licenceForm = this.fb.group({
        enseigne: [data.enseigne, [Validators.required]],
        siret: [data.siret, [Validators.required]],
        code_naf: [data.code_naf, [Validators.required]],
        numero_tva: [data.numero_tva, [Validators.required]],
        telephone: [data.telephone, [Validators.required]],
        adresse: [data.adresse, [Validators.required]],
        code_postal: [data.code_postal, [Validators.required]],
        ville: [data.ville, [Validators.required]],
        pays: [data.pays, [Validators.required]],
        nombre_postes: [data.nombre_postes, [Validators.required]],
        duree_utilisation: [data.duree_utilisation, [Validators.required]],
        client_email: [data.client_email, [Validators.required]],
        client_pwd: [data.client_pwd, [Validators.required]],
        etat: [data.etat, [Validators.required]],
        site: [data.site, [Validators.required]],
        exercice: [data.exercice, [Validators.required]],
         
      })      
    })    
  }

  /* Reactive book form */
  updateBookForm() {
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

  /* Date 
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.licenceForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  }*/

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.licenceForm.controls[controlName].hasError(errorName);
  }

  /* Update book */
  updateLicenceForm() {
    console.log(this.licenceForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.licenceApi.UpdateLicence(id, this.licenceForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/licences-list'))
      });
    }
  }
  
}
