import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared-button',
  templateUrl: './shared-button-loader.component.html',
  styleUrls: ['./shared-button-loader.component.scss']
})
export class SharedButtonLoaderComponent implements OnInit {

  @Input() title: string = ''
  @Input() loading: boolean = false
  @Input() disabled: boolean = false
  @Input() outline: boolean = false

  constructor() { }

  ngOnInit(): void { }

}
