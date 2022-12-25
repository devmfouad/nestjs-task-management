import { TaskStatus } from '../task.model';

export class SearchTasksDto {
  status: TaskStatus;
  searchTerm: string;
}
