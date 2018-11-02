import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatTableModule, MatTabsModule,
  MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule,
   MatCardModule, MatMenuModule, MatPaginatorModule, MatSortModule, MatExpansionModule,
    MatFormField, MatFormFieldModule, MatChipsModule, MatSelectModule, MatAutocompleteModule, 
    MatRadioModule, MatSnackBarModule, MatBadgeModule, MatDialogModule} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatRadioModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatTableModule,
    MatTabsModule,
    CommonModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatRadioModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatChipsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatTableModule,
    MatTabsModule,
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class MaterialModule { }
