import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { CandidatesService } from 'src/app/services/candidates.service';

@Component({
  selector: 'app-dialog-candidates',
  templateUrl: './dialog-candidates.component.html',
  styleUrls: ['./dialog-candidates.component.scss']
})
export class DialogCandidatesComponent implements OnInit {

  candidateForm: any
  dropzoneHovered: boolean = false
  isLoading: boolean = false
  selectedIndex: number = 0
  myControl = new FormControl(null)
  candidateId: string = ''

  constructor(
    private dialogRef: MatDialogRef<DialogCandidatesComponent>,
    private candidatesService: CandidatesService,
  ) { }

  ngOnInit() { }


  formValid(event: any) {

    this.candidateForm = event
    this.candidateId = this.candidateForm.id
    delete this.candidateForm.id
    this.selectedIndex = 1

  }

  patchToSetProfileImage(id: string, candidateFormValue: any) {

    this.candidatesService.updateColaborator(id, candidateFormValue).subscribe({
      next: (response) => {

        this.isLoading = false
        document.getElementById('drop-container')!.style.backgroundImage = `url(${candidateFormValue.profileImage})`;
        // TODO: add snackbar success message

      }, error: (err) => {

        console.log(err, 'error ocurrent here')

      }
    })

  }



  uploadFile(event: any, isProfileImage: boolean) {

    this.isLoading = true
    let file = event.target.files[0]
    let formData = new FormData
    formData.append('selected_files', file)

    this.candidatesService.uploadFiles(this.candidateId, formData).subscribe({
      next: (response: any) => {

        if(isProfileImage) {

          let newData = { profileImage: `https://${response.data.fileUrl}` }
          this.patchToSetProfileImage(this.candidateId, newData)

        } else {

          // TODO: add snackbar success message
          this.isLoading = false

        }

      },
      error: (err) => {

        this.isLoading = false

      },
    })

  }


  closeDialog(): void {

    this.dialogRef.close()

  }


}
