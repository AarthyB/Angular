import { Component, input, output } from '@angular/core';
import { NgFor } from '@angular/common';
import { KanbanStage, CardSelectEvent } from '../../kanban.model';
import { KanbanCardComponent } from '../kanban-card/kanban-card.component';

@Component({
  selector: 'app-kanban-stage',
  standalone: true,
  imports: [NgFor, KanbanCardComponent],
  template: `
    <div class="kanban_stage">
      <h2 class="kanban_header">{{ stage().name }}</h2>
      <div class="kanban_card_container">
        <app-kanban-card
          *ngFor="let card of stage().cards; trackBy: trackById"
          [card]="card"
          (cardSelected)="onCardSelected($event)"
        />
      </div>
    </div>
  `,
  styles: [`
    .kanban_stage {
      width: 280px;
      flex-shrink: 0;
      text-align: center;
      margin: 10px;
      background-color: #dfe1e6;
      border-radius: 3px;
    }
    .kanban_card_container {
      margin: 0 10px 10px;
    }
    h2.kanban_header {
      padding: 10px 5px;
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: 0.03em;
      text-transform: uppercase;
    }
  `]
})
export class KanbanStageComponent {
  stage = input.required<KanbanStage>();
  cardSelect = output<CardSelectEvent>();

  onCardSelected(cardId: number): void {
    this.cardSelect.emit({ cardId, stageId: this.stage().id });
  }

  trackById(_index: number, card: { id: number }): number {
    return card.id;
  }
}
