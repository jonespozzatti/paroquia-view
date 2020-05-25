import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';




@Component({
  selector: 'app-confirmar-dialog',
  templateUrl: './confirmar-dialog.component.html',
  styleUrls: ['./confirmar-dialog.component.css']
})
export class ConfirmarDialog implements OnInit{

  title: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<ConfirmarDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
 

  ngOnInit(): void {
  }

}
