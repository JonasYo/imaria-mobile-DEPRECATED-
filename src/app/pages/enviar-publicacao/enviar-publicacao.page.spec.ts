import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarPublicacaoPage } from './enviar-publicacao.page';

describe('EnviarPublicacaoPage', () => {
  let component: EnviarPublicacaoPage;
  let fixture: ComponentFixture<EnviarPublicacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviarPublicacaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviarPublicacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
