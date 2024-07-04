import { getTags, getWorkouts } from '@/lib/data';
import { FilterSearchParams, GroupsWorkout, Workout } from '@/lib/definitions';
import React from 'react'
import Workouts from './Workouts';
import Groups from './Groups';

type ListProps = {
  searchParams?: FilterSearchParams,
  locale: string
}

export default async function List({ searchParams, locale }: ListProps) {
  const showWorkouts = searchParams && Boolean((searchParams?.query ?? '') || (searchParams?.tags ?? []).length);

  if (showWorkouts) {
    const results = await getWorkouts(searchParams, locale) as Workout[] | null;
    return <Workouts workouts={results} />
  }
  const results = await getTags('muscle', locale) as GroupsWorkout[] | null;
  return <Groups groups={results} />
}