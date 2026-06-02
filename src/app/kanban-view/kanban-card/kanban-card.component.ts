import { Component, input, output } from '@angular/core';
import { KanbanCard } from '../../kanban.model';

@Component({
  selector: 'app-kanban-card',
  standalone: true,
  template: `
    <div class="kanban_card" (click)="cardSelected.emit(card().id)">
      <div class="kanban_card_content">{{ card().name }}</div>
    </div>
  `,
  styles: [`
    .kanban_card {
      background-color: #fff;
      border-radius: 3px;
      box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
      margin-bottom: 8px;
      width: 100%;
      cursor: pointer;
      transition: box-shadow 0.15s ease;
    }
    .kanban_card:hover {
      box-shadow: 0 4px 8px rgba(9, 30, 66, 0.2);
    }
    .kanban_card_content {
      padding: 10px;
    }
  `]
})
export class KanbanCardComponent {
  card = input.required<KanbanCard>();
  cardSelected = output<number>();
}
