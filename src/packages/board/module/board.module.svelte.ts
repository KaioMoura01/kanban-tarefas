import { notificationsModule } from '../../notifications/module/notifications.module';
import { storageGateway } from '../gateway/storage.gateway';
import { boardService } from '../service/board.service';
import { BOARD_MESSAGES } from '../toast/messages';
import type { TaskDraft } from '../types/draft';
import type { ColumnId, Task } from '../types/task';
import { taskDraftSchema } from '../validators/schemas';

/** Reactive facade for the board. Single interface between UI and domain. */
class BoardModule {
	private tasks = $state<Task[]>([]);
	private draggingId = $state<string | null>(null);
	private removalId = $state<string | null>(null);
	private detailId = $state<string | null>(null);

	get all(): Task[] {
		return this.tasks;
	}

	get pendingRemovalId(): string | null {
		return this.removalId;
	}

	get selectedTask(): Task | null {
		return this.tasks.find((task) => task.id === this.detailId) ?? null;
	}

	get total(): number {
		return this.tasks.length;
	}

	get activeDragId(): string | null {
		return this.draggingId;
	}

	hydrate(): void {
		this.tasks = storageGateway.read();
	}

	inColumn(columnId: ColumnId): Task[] {
		return boardService.inColumn(this.tasks, columnId);
	}

	create(draft: TaskDraft): boolean {
		const parsed = taskDraftSchema.safeParse(draft);
		if (!parsed.success) {
			notificationsModule.notifyError(BOARD_MESSAGES.invalid);
			return false;
		}

		this.commit(boardService.create(this.tasks, parsed.data));
		notificationsModule.notifySuccess(BOARD_MESSAGES.created);
		return true;
	}

	openDetail(id: string): void {
		this.detailId = id;
	}

	closeDetail(): void {
		this.detailId = null;
	}

	requestRemove(id: string): void {
		this.removalId = id;
	}

	cancelRemove(): void {
		this.removalId = null;
	}

	confirmRemove(): void {
		if (!this.removalId) {
			return;
		}

		this.commit(boardService.remove(this.tasks, this.removalId));
		notificationsModule.notifyInfo(BOARD_MESSAGES.removed);
		this.removalId = null;
	}

	beginDrag(id: string): void {
		this.draggingId = id;
	}

	endDrag(): void {
		this.draggingId = null;
	}

	dropOn(columnId: ColumnId): void {
		if (!this.draggingId) {
			return;
		}

		this.commit(boardService.move(this.tasks, this.draggingId, columnId));
		this.endDrag();
	}

	private commit(next: Task[]): void {
		this.tasks = next;
		storageGateway.write(next);
	}
}

export const boardModule = new BoardModule();
