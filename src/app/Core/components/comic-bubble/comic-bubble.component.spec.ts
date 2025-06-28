import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicBubbleComponent } from './comic-bubble.component';

describe('ComicBubbleComponent', () => {
  let component: ComicBubbleComponent;
  let fixture: ComponentFixture<ComicBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComicBubbleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComicBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
