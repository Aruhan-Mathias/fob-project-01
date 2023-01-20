import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss']
})
export class DialogDeleteComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DialogDeleteComponent>
  ) { }

  ngOnInit(): void { }

  closeDialog(result: boolean) {

    this.dialogRef.close(result)

  }

}
