import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatTabsModule } from "@angular/material";
const material = [MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatTabsModule]
@NgModule({
  exports: [material],
  imports: [material]
})
export class MaterialModule { }
