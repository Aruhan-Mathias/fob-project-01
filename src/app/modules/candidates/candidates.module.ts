import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressBarModule } from '@angular/material/progress-bar';

import { CandidatesRoutingModule } from './candidates-routing.module';
import { CandidatesComponent } from './candidates.component';
import { CandidatesDetailComponent } from './candidates-detail/candidates-detail.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CandidatesComponent,
    CandidatesDetailComponent
  ],
  imports: [
    CommonModule,
    CandidatesRoutingModule,
    MatProgressBarModule,
    SharedModule
  ]
})
export class CandidatesModule { }
