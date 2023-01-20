import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SharedButtonLoaderModule } from '../shared-button-loader/shared-button-loader.module';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    NgxMaskModule,
    SharedButtonLoaderModule
  ],
  exports: [
    FormComponent
  ]
})
export class FormModule { }
