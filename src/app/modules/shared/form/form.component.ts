import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { CandidatesService } from 'src/app/services/candidates.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() formType: string | undefined = 'create'
  @Input() id: string = ''
  @Output() validForm = new EventEmitter<any>();
  candidateForm: any
  currentDate: any = Date.now()
  candidateId: string = ''
  selectedIndex: number = 0
  filteredOptions: Observable<string[]> | undefined
  isLoading: boolean = false
  states: string[] = [
    'AC - Acre',
    'AL - Alagoas',
    'AP - Amapá',
    'AM - Amazonas',
    'BA - Bahia',
    'CE - Ceará',
    'DF - Distrito Federal',
    'ES - Espírito Santo',
    'GO - Goías',
    'MA - Maranhão',
    'MT - Mato Grosso',
    'MS - Mato Grosso do Sul',
    'MG - Minas Gerais',
    'PA - Pará',
    'PB - Paraíba',
    'PR - Paraná',
    'PE - Pernambuco',
    'PI - Piauí',
    'RJ - Rio de Janeiro',
    'RN - Rio Grande do Norte',
    'RS - Rio Grande do Sul',
    'RO - Rondônia',
    'RR - Roraíma',
    'SC - Santa Catarina',
    'SP - São Paulo',
    'SE - Sergipe',
    'TO - Tocantins'
  ]
  modalities: Array<any> =[
    {name: 'Acrobata', value: 'acrobata'},
    {name: 'Bailarino(a)', value: 'bailarino'},
    {name: 'Capoeira', value: 'capoeira'},
    {name: 'Circence', value: 'circence'},
    {name: 'Dançarino(a)', value: 'dancarino'},
  ]

  constructor(
    private fb: FormBuilder,
    private candidatesService: CandidatesService
  ) { }

  ngOnInit() {

    this.createCandidateForm()

    if(this.formType === 'update') {

      this.getCandidateDetails(this.id)

    }

  }

  createCandidateForm() {

    this.candidateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(8)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      weight: ['', [Validators.required, Validators.max(150)]],
      height: ['', [Validators.required, Validators.min(140), Validators.max(200)]],
      state: ['', Validators.required],
      modality: this.fb.array([]),
      passport: this.fb.group({
        expirationDate: '',
        isValid: false
      }),
      showToCustomer: false,
      social: this.fb.group({
        facebook: '',
        instagram: ''
      }),
      traveled: '',
      favorite: false,
      profileImage: '',
      contactNumber: ['', [Validators.required, Validators.minLength(11)]]
    })

  }

  getCandidateDetails(id: string) {

    this.candidatesService.getCandidateById(id).subscribe({
      next: (response: any) => {

        this.candidateForm.patchValue({
          name: response.data.name,
          age: response.data.age,
          weight: response.data.weight,
          height: response.data.height,
          state: response.data.state,
          passport: {
            expirationDate: response.data.passport.expirationDate,
            // isValid: false
          },
          // showToCustomer: false,
          social: {
            facebook: response.data.social.facebook,
            instagram: response.data.social.instagram
          },
          traveled: response.data.traveled,
          // favorite: false,
          profileImage: response.data.profileImage,
          contactNumber: response.data.contactNumber,
        })

          // modality: this.fb.array([]),
          this.candidateForm.setControl('modality', this.fb.array(response.data.modality || []))
          this.modalities.map((item: any) => {
            console.log(item, 'item')

            return this.candidateForm.value.modality.forEach((modality: any) => {
              console.log(modality, 'modality')
              if(modality === item.value) {
                return item.checked = true
              }else
                return item
            })
          })

        this.validForm.emit(response.data) //return url profile image to show in details

      }

    })

  }

  onClickCheckbox(event: any) {

    const modalityFormArray = (this.candidateForm.controls['modality'] as FormArray)

    if(event.source.checked) {

      modalityFormArray.push(this.fb.control(event.source.value))

    } else {

      let indexToRemove = modalityFormArray.controls.findIndex((item: any) => item.value === event.source.value)
      modalityFormArray.removeAt(indexToRemove)

    }

  }

  filterStates() {

    this.filteredOptions = this.candidateForm.get('state').valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value || '')),
    );

  }

  _filter(value: string): string[] {

    const filterValue = value.toLowerCase()

    return this.states.filter(state => state.toLowerCase().includes(filterValue))

  }


  updateCandidate(formValue: any) {

    this.candidatesService.updateColaborator(this.id, formValue).subscribe({
      next: (response: any) => {

        //TODO: add snackbar success message

      }
    })

  }


  saveAndContinue(): void {

    if(!this.candidateForm.valid) {
      return this.candidateForm.markAllAsTouched()
    }

    this.isLoading = true
    this.candidatesService.createCandidate(this.candidateForm.value).subscribe({

      next: (response: any) => {

        this.isLoading = false
        this.candidateId = response.data.id
        this.validForm.emit({...this.candidateForm.value, id: this.candidateId})

      },
      error: (err) => {

        console.log(err)

      },

    })

  }


}

