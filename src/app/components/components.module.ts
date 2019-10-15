import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MarcarHorarioComponent } from './marcar-horario/marcar-horario.component';

const PAGES_COMPONENTS = [
  MarcarHorarioComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
  ],
  declarations: [
    PAGES_COMPONENTS
  ],
  exports: [
    PAGES_COMPONENTS
  ],
  entryComponents: [
    PAGES_COMPONENTS
  ],
})

export class ComponentsModule { }
