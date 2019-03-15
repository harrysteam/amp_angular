import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanComponent } from './plan/plan.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [PlanComponent],
  imports: [
    ComponentsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: PlanComponent
      }
    ]),
    CommonModule
  ]
})
export class AuthModule { }
