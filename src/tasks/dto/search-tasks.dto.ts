import { TaskStatus } from '../task-status.enum';

export class SearchTasksDto {
  status: TaskStatus;
  searchTerm: string;
}
