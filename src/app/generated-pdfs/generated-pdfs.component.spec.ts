import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedPdfsComponent } from './generated-pdfs.component';

describe('GeneratedPdfsComponent', () => {
  let component: GeneratedPdfsComponent;
  let fixture: ComponentFixture<GeneratedPdfsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratedPdfsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratedPdfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
