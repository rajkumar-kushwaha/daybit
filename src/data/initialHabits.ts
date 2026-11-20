import { Habit, HabitCategory } from '../types/habit';

export interface StarterHabitOption {
  id: string;
  name: string;
  category: HabitCategory;
  emoji: string;
  color: string;
  targetPerMonth: number;
  description: string;
}

export const STARTER_HABIT_OPTIONS: StarterHabitOption[] = [
  {
    id: 'h1',
    name: 'Drink 2.5L Water',
    category: 'Health',
    emoji: 'droplets',
    color: '#0ea5e9', // Sky blue
    targetPerMonth: 28,
    description: 'Stay hydrated — keep a 1L bottle on desk and refill throughout the day',
  },
  {
    id: 'h2',
    name: 'Morning Workout / Walk',
    category: 'Fitness',
    emoji: 'activity',
    color: '#10b981', // Emerald
    targetPerMonth: 22,
    description: '30 mins of exercise, jogging, gym or a brisk morning walk',
  },
  {
    id: 'h3',
    name: 'Read 20 Mins',
    category: 'Learning',
    emoji: 'book-open',
    color: '#6366f1', // Indigo
    targetPerMonth: 25,
    description: 'Read non-fiction, career growth books, or articles without distractions',
  },
];

export function buildHabitsFromStarterIds(selectedIds: string[]): Habit[] {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const createdIso = new Date(year, month, 1).toISOString();

  return STARTER_HABIT_OPTIONS
    .filter((opt) => selectedIds.includes(opt.id))
    .map((opt) => ({
      id: opt.id,
      name: opt.name,
      category: opt.category,
      color: opt.color,
      emoji: opt.emoji,
      targetPerMonth: opt.targetPerMonth,
      createdAt: createdIso,
      description: opt.description,
      completions: {},
    }));
}

export const DEFAULT_STARTER_HABIT_IDS = ['h1', 'h2', 'h3'];

export function getDefaultHabits(): Habit[] {
  return buildHabitsFromStarterIds(DEFAULT_STARTER_HABIT_IDS);
}
