import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SharedButtonLoaderComponent } from './shared-button-loader.component';

@NgModule({
  declarations: [
    SharedButtonLoaderComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    SharedButtonLoaderComponent
  ]
})

export class SharedButtonLoaderModule { }
