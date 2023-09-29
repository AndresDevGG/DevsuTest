import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FormAction } from 'src/app/components/product-components/form-product/form-product.component';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit {

  public actionForm: FormAction;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.actionForm = this.route.data['_value'].action ?? 'create';
  }

}
