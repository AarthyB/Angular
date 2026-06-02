export interface KanbanCard {
  id: number;
  name: string;
}

export interface KanbanStage {
  id: number;
  name: string;
  cards: KanbanCard[];
}

export interface CardSelectEvent {
  cardId: number;
  stageId: number;
}
