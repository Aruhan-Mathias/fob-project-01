import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidatesService } from 'src/app/services/candidates.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

  isLoading: boolean = false
  allCandidates: any = []

  constructor(
    private candidatesService: CandidatesService,
    private dialogService: DialogService,
    private route: Router,
  ) { }

  ngOnInit(): void {

    this.getCandidates()

  }

  getCandidates() {

    this.candidatesService.getAllCandidates().subscribe((result: any) => {
      this.allCandidates = result.data
    })

  }

  openDialogNewCandidate() {

    this.dialogService.openDialogCandidate().subscribe(() => {
      this.getCandidates()
    })

  }

  openDeleteDialog(candidateId: string) {

    this.dialogService.openDialogDelete().subscribe((result: any) => {

      if(result) {

        this.deleteCandidate(candidateId)

      }

    })

  }

  deleteCandidate(id: string) {

    this.candidatesService.deleteCandidate(id).subscribe((response: any) => {

      this.allCandidates = this.allCandidates.filter((candidate: any) => candidate.id !== id)

    }, (error: any) => {

      // TODO: add bad message snackbar
      console.log(error, 'error ocurrent here')

    })

  }

  navigateToDetails(candidateId: string) {

    this.route.navigate([`candidates/${candidateId}`])

  }

}
