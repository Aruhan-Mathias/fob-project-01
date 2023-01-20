import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { DialogCandidatesComponent } from './dialog-candidates/dialog-candidates.component';
import { SharedButtonLoaderModule } from '../shared-button-loader/shared-button-loader.module';

import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { FormModule } from '../form/form.module';


@NgModule({
  declarations: [
    DialogCandidatesComponent,
    DialogDeleteComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatTabsModule,
    FormModule,
    SharedButtonLoaderModule
  ],
  exports: [
    MatInputModule
  ]
})
export class DialogModule { }
