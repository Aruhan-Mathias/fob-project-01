import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatesDetailComponent } from './candidates-detail/candidates-detail.component';
import { CandidatesComponent } from './candidates.component';

const routes: Routes = [

  { path: '', component: CandidatesComponent },
  { path: ':id', component: CandidatesDetailComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatesRoutingModule { }
