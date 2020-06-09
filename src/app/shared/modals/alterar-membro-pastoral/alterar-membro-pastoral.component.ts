import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alterar-membro-pastoral',
  templateUrl: './alterar-membro-pastoral.component.html',
  styleUrls: ['./alterar-membro-pastoral.component.css']
})
export class AlterarMembroPastoralComponent {

  constructor(
    public dialogRef: MatDialogRef<AlterarMembroPastoralComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close({
    });
  }

}
