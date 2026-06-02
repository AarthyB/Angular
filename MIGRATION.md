# Angular 8 → Angular 19 Migration

## What changed and why

### Angular version
- **Before:** Angular 8.2 (`~2020`)
- **After:** Angular 19

---

### Standalone components (no more NgModule)
Angular 14+ introduced standalone components. By Angular 19 this is the **default and recommended approach**.

- **Removed:** `app.module.ts`, `kanban-view.module.ts`
- **Changed:** Every component now has `standalone: true` and declares its own `imports` array
- **Before:**
  ```ts
  @NgModule({ declarations: [KanbanViewComponent], imports: [FormsModule, CommonModule] })
  export class KanbanViewModule {}
  ```
- **After:** Component-level imports, no module file needed
  ```ts
  @Component({ standalone: true, imports: [NgFor, FormsModule, KanbanStageComponent] })
  ```

---

### bootstrapApplication instead of platformBrowserDynamic
- **Before:** `platformBrowserDynamic().bootstrapModule(AppModule)`
- **After:** `bootstrapApplication(AppComponent)` — no root NgModule required

---

### Typed `input()` and `output()` signals (Angular 17+)
Old `@Input()` / `@Output()` decorators are replaced by signal-based functions.

- **Before:**
  ```ts
  @Input() card: object;
  @Output() onCardSelected = new EventEmitter<Object>();
  ```
- **After:**
  ```ts
  card = input.required<KanbanCard>();   // typed, required
  cardSelected = output<number>();       // no EventEmitter needed
  ```

---

### Signal-based state (`signal()`)
The `stages` array in `kanban-view.component.ts` is now a **signal** instead of a plain property. This enables Angular's fine-grained reactivity without Zone.js patching.

- **Before:** `stages = [...]`
- **After:** `stages = signal<KanbanStage[]>([...])`
  - Updates via `stages.update(...)` for immutable state changes
  - Template reads via `stages()` (function call syntax)

---

### Shared type model (`kanban.model.ts`)
- **Before:** `card: object` — no types at all
- **After:** `KanbanCard`, `KanbanStage`, `CardSelectEvent` interfaces — fully typed across components

---

### Strict TypeScript
`tsconfig.json` now has `"strict": true`, catching:
- Implicit `any`
- Possibly undefined values
- Missing return types

---

### Build system change
- **Before:** `@angular-devkit/build-angular:browser` (Webpack)
- **After:** `@angular-devkit/build-angular:application` (esbuild — much faster)

---

### `polyfills` config
- **Before:** `src/polyfills.ts` file (manually maintained)
- **After:** `"polyfills": ["zone.js"]` inline in `angular.json` — the file is no longer needed

---

### Removed deprecated items
| Removed | Reason |
|---|---|
| `tslint.json` | TSLint is EOL; use ESLint (`ng add @angular-eslint/schematics`) |
| `browserslist` | Replaced by `"target": "ES2022"` in tsconfig |
| `protractor` e2e config | Protractor is EOL; use Playwright or Cypress |
| `karma.conf.js` (manual) | Managed via `angular.json` test config |
| `polyfills.ts` | Inlined in `angular.json` |

---

### UX improvements (bonus)
- `Enter` key submits new task (was click-only)
- Empty task names are ignored
- Card IDs use an incrementing counter instead of `length + 1` (avoids ID collisions after deletions)
- `trackBy` added to all `*ngFor` loops for efficient DOM updates
- Cards are immutably updated (spread operator) rather than mutated in place
- Improved button labels and hover/disabled styles

---

## How to run

```bash
npm install
ng serve
```
