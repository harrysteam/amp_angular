import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { OffersComponent } from './offers/offers.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    SideBarComponent,
    OffersComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    SideBarComponent,
    OffersComponent
  ]
})
export class ComponentsModule { }
