import { Licence } from './../../shared/licence';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-licences-list',
  templateUrl: './licences-list.component.html',
  styleUrls: ['./licences-list.component.css']
})

export class LicencesListComponent implements OnInit {
  LicenceData: any = [];
  dataSource: MatTableDataSource<Licence>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['_id','enseigne', 'siret', 'numero_tva','telephone','adresse','code_postal','ville','pays','nombre_postes','duree_utilisation','client_email','client_pwd','licence','code_licence','etat','site','exercice','action'];

  constructor(private licenceApi: ApiService) {
    this.licenceApi.GetLicences().subscribe(data => {
      this.LicenceData = data;
      this.dataSource = new MatTableDataSource<Licence>(this.LicenceData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() { }

  deleteLicence(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.licenceApi.DeleteLicence(e._id).subscribe()
    }
  }

}