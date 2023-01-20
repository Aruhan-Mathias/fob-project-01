import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCandidatesComponent } from '../modules/shared/dialog/dialog-candidates/dialog-candidates.component';
import { DialogDeleteComponent } from '../modules/shared/dialog/dialog-delete/dialog-delete.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }


  openDialogCandidate() {

    return this.dialog.open(DialogCandidatesComponent, {
      //config
    }).afterClosed()

  }

  openDialogDelete() {

    return this.dialog.open(DialogDeleteComponent, {
      //config
    }).afterClosed()

  }


}
