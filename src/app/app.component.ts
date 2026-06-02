import { Component } from '@angular/core';
import { KanbanViewComponent } from './kanban-view/kanban-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [KanbanViewComponent],
  template: `<app-kanban-view />`
})
export class AppComponent {}
