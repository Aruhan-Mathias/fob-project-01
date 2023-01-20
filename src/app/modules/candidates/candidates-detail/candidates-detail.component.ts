import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CandidatesService } from 'src/app/services/candidates.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-candidates-detail',
  templateUrl: './candidates-detail.component.html',
  styleUrls: ['./candidates-detail.component.scss']
})
export class CandidatesDetailComponent implements OnInit {

  id: string = ''
  isLoading: boolean = false
  isLoadingMedias: boolean = false
  profileImage: any
  candidateForm: any = ''
  inscription: Subscription | any
  medias: any = []
  video: any = []

  constructor(
    private route: ActivatedRoute,
    private candidatesService: CandidatesService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {

    this.inscription = this.route.params.subscribe((param: any) => {
      this.id = param['id'];
    })

  }

  ngOnDestroy() {

    this.inscription.unsubscribe()

  }


  getCandidateMedia(event: any) {

    this.candidateForm = event
    this.isLoadingMedias = true

    this.candidatesService.getMediasByCandidateId(this.candidateForm.id).subscribe({

      next: (response: any) => {

        //TODO: add snackbar
        this.medias = response.files.filter((media: any) => `https://${media.fileUrl}` !== this.candidateForm.profileImage &&  media.filesExtension !== '.mp4')
        this.video = response.files.filter((media: any) => media.filesExtension === '.mp4')
        this.isLoadingMedias = false

      },
      error(err) {

        //TODO: add snackbar
        console.log(err, 'error ocurrent here')

      },

    })

  }


  openDeleteDialog(key: string, isProfileImage: boolean) {

    this.dialogService.openDialogDelete().subscribe((result: any) => {

      if(result) {

        this.deleteFile(key, isProfileImage)

      }

    })

  }


  openDialogImage(url: string) {

    

  }


  updateProfileImage(formValue: any) {

    this.candidatesService.updateColaborator(this.id, formValue).subscribe({
      next: (response: any) => {

        //TODO: add snackbar success message
        this.candidateForm.profileImage = formValue.profileImage
        const profileImage = document.getElementById('profileImage') as HTMLImageElement
        profileImage.src = formValue.profileImage
      }
    })

  }


  uploadFile(event: any, isProfileImage: boolean) {

    this.isLoadingMedias = true
    let file = event.target.files[0]
    let formData = new FormData
    formData.append('selected_files', file)

    this.candidatesService.uploadFiles(this.id, formData).subscribe({
      next: (response: any) => {

        this.getCandidateMedia(this.candidateForm)
        if(isProfileImage) {
          const newData = { profileImage: `https://${response.data.fileUrl}` }
          this.updateProfileImage(newData)
        }

      },
      error: (err) => {

        this.isLoadingMedias = false

      },
    })

  }


  deleteFile(key: any, isProfileImage?: boolean) {

    this.isLoadingMedias = true

    this.candidatesService.deleteCandidateFiles(key.replaceAll("/", "%2F")).subscribe({
      next: (response: any) => {

        //TODO: add snackbar
        this.getCandidateMedia(this.candidateForm)

        if(isProfileImage) {
          const newData = { profileImage: '' }
          this.updateProfileImage(newData)
        }

      }, error: (err: any) => {

        //TODO: add snackbar
        this.isLoadingMedias = false

      }
    })

  }

}
