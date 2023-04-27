type States = 'pending' | 'completed';

export interface Task {
  id: string;
  name: string;
  state: States
}
