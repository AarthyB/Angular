import { Component, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KanbanStage, KanbanCard, CardSelectEvent } from '../kanban.model';
import { KanbanStageComponent } from './kanban-stage/kanban-stage.component';

@Component({
  selector: 'app-kanban-view',
  standalone: true,
  imports: [NgFor, FormsModule, KanbanStageComponent],
  templateUrl: './kanban-view.component.html',
  styleUrls: ['./kanban-view.component.css']
})
export class KanbanViewComponent {
  stages = signal<KanbanStage[]>([
    { id: 1, name: 'Backlog',  cards: [] },
    { id: 2, name: 'To Do',   cards: [] },
    { id: 3, name: 'Ongoing', cards: [] },
    { id: 4, name: 'Done',    cards: [] },
  ]);

  task = '';
  selectedCardName = '';
  selectedStageIndex = -1;
  selectedCardId = -1;

  private nextId = 1;

  onAddCard(): void {
    const name = this.task.trim();
    if (!name) return;
    this.stages.update(stages => {
      const updated = [...stages];
      updated[0] = {
        ...updated[0],
        cards: [...updated[0].cards, { id: this.nextId++, name }]
      };
      return updated;
    });
    this.task = '';
  }

  onCardSelect(event: CardSelectEvent): void {
    this.selectedStageIndex = event.stageId - 1;
    this.selectedCardId = event.cardId;
    const card = this.stages()[this.selectedStageIndex].cards.find(c => c.id === event.cardId);
    this.selectedCardName = card?.name ?? '';
  }

  onMoveBackCard(): void {
    this.moveCard(this.selectedStageIndex, this.selectedStageIndex - 1);
  }

  onMoveForwardCard(): void {
    this.moveCard(this.selectedStageIndex, this.selectedStageIndex + 1);
  }

  onCardDelete(): void {
    const idx = this.selectedStageIndex;
    this.stages.update(stages => {
      const updated = [...stages];
      updated[idx] = {
        ...updated[idx],
        cards: updated[idx].cards.filter(c => c.id !== this.selectedCardId)
      };
      return updated;
    });
    this.clearSelection();
  }

  private moveCard(fromIdx: number, toIdx: number): void {
    this.stages.update(stages => {
      const updated = [...stages];
      const card = updated[fromIdx].cards.find(c => c.id === this.selectedCardId)!;
      updated[fromIdx] = {
        ...updated[fromIdx],
        cards: updated[fromIdx].cards.filter(c => c.id !== this.selectedCardId)
      };
      updated[toIdx] = {
        ...updated[toIdx],
        cards: [...updated[toIdx].cards, card]
      };
      return updated;
    });
    this.selectedStageIndex = toIdx;
  }

  trackById(_index: number, stage: KanbanStage): number {
    return stage.id;
  }

  private clearSelection(): void {
    this.selectedCardName = '';
    this.selectedStageIndex = -1;
    this.selectedCardId = -1;
  }
}
// trackById helper used in template
