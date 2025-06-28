// comic-bubble.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comic-bubble',
  standalone: true,
  template: `
    <div class="comic-bubble" [class.visible]="visible">
      <div class="bubble-content">
        {{ message }}
      </div>
      <div class="bubble-arrow"></div>
    </div>
  `,
  styles: [`
    .comic-bubble {
      position: absolute;
      background-color: #fff9c4;
      border: 3px solidrgb(0, 181, 103);
      border-radius: 15px;
      padding: 12px;
      box-shadow: 5px 5px 0 rgba(0,0,0,0.1);
      z-index: 1000;
      max-width: 250px;
      font-family: 'Comic Sans MS', cursive;
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.2s, transform 0.2s;
      pointer-events: none;
    }
    
    .comic-bubble.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .bubble-arrow {
      position: absolute;
      width: 0;
      height: 0;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      border-top: 15px solidrgb(0, 165, 44);
      bottom: -15px;
      left: 20px;
    }
    
    .bubble-arrow:before {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      border-top: 12px solidrgb(0, 210, 109);
      bottom: 2px;
      left: -12px;
    }
    
    .bubble-content {
      white-space: pre-line;
      text-align: center;
    }
  `]
})
export class ComicBubbleComponent {
  @Input() message: string = '';
  @Input() visible: boolean = false;
}