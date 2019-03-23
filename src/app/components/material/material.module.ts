import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatTabsModule, MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule
  ],
  exports: [
    MatButtonModule,
    MatTabsModule,
    MatDialogModule
  ]
})
export class MaterialModule { }
