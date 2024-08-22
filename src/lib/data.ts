import { format } from "date-fns";
import bcrypt from 'bcryptjs';
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

import { THEMES, User as LocalUser, UserInfo, Workout, GroupsWorkout, FilterSearchParams, Plan, PlanDay, Exercise, WorkoutComplex, WeightData, UUID, SimplePlan, ActionFormState } from "@/lib/definitions";
import { auth } from "@/auth";
import { sql } from "@vercel/postgres";
import { User } from "next-auth";

export async function fetchEvents(date: Date) {
  const dateFormatted = format(date, 'yyyy-MM-dd');
  await wait(2000);

  return [
    {
      "id": "629924078f28b719d95f61af",
      "name": "Hand exercise",
      "imageUrl": "https://source.unsplash.com/300x300/?productivity,city",
      "description": "",
      "startDatetime": "2024-05-24T20:00",
      "endDatetime": "2024-05-24T23:00",
      "active": true
    },
    {
      "id": "629924078f28b719d95f61ad",
      "name": "Arm day workout",
      "imageUrl": "https://source.unsplash.com/300x300/?productivity,city",
      "description": "",
      "startDatetime": "2024-05-24T20:00",
      "endDatetime": "2024-05-24T23:00",
      "active": true
    },
    {
      "id": "629924078f28b719d95f61ah",
      "name": "Reyno Show",
      "imageUrl": "https://source.unsplash.com/300x300/?productivity,city",
      "description": "",
      "startDatetime": "2024-05-24T20:00",
      "endDatetime": "2024-05-24T23:00",
      "active": true
    },
    {
      "id": "629924078f28b719d95f61al",
      "name": "Gym workout",
      "imageUrl": "https://source.unsplash.com/300x300/?productivity,city",
      "description": "",
      "startDatetime": "2024-05-24T20:00",
      "endDatetime": "2024-05-24T23:00",
      "active": true
    },
  ];
}

export async function findUserByEmail({email, includePassword}: {email: string, includePassword: boolean}): Promise<any> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function getUserInfo(user_id: string): Promise<UserInfo | null> {
  try {
    type UserInfoMod = Omit<UserInfo, 'dashboard'> & { dashboard: string | null }
    const { rows, rowCount } = await sql<UserInfoMod>`
      SELECT TRIM(ui.theme) as theme, ui.onboarding, ui.assessment, ui.dashboard, ui.admin,
        CASE WHEN ua.gender = 'M' THEN 'male' WHEN ua.gender = 'F' THEN 'female' ELSE 'other' END AS gender,
        TO_CHAR(ua.birthdate, 'yyyy-mm-dd') as birthdate, ua.weight, ua.height, ua.goal, date_part('year', age(ua.birthdate)) as age
      FROM users_info ui LEFT OUTER JOIN assessments ua ON ui.user_id = ua.user_id WHERE ui.user_id=${user_id}`;
    if (rowCount === 0) {
      return null
    }
    const userInfo = rows[0];
    return {
      ...userInfo,
      dashboard: userInfo.dashboard?.split(';') ?? ['MyWeight', 'Recommendations']
    } as UserInfo;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}

// TODO: MAKE THIS FUNCTION WORK
export async function checkUserPlanExists(userId: string): Promise<void> {
  try {
    const user = await sql<User>`SELECT email FROM users WHERE id=${userId}`;
    if (!user.rowCount) return;
    const email = user.rows[0].email;
    const current_plans = (await getUserPlans('en', userId) ?? []).map(({ id }: { id: string }) => id);
    const { rowCount, rows} = await sql<Plan>`
      SELECT id FROM plans WHERE ${email} = ANY(custom_emails::text[])
    `;
    if (rowCount === 0) return;
    const new_plans = rows.filter(({ id }: { id: string }) => !current_plans.includes(id));
    if (!new_plans.length) return;
    for (const { id: planId } of new_plans) {
      await createUserPlan(userId, planId);
    };
    const plans = await getUserPlans('en', userId) ?? [];
    const last_one = plans.at(-1);
    if (last_one && !plans?.some(({ is_current }: { is_current?: boolean }) => is_current)) {
      await setAsCurrentPlan(userId, last_one.id as string);
    }
  } catch (error) {
    console.error('Failed to fetch checkUserPlanExists:', error);
  }
}

export async function createUser({name, email, password}: LocalUser): Promise<User> {
  try {
    const salt = bcrypt.genSaltSync(10);
    const passwordEncrypt = password ? bcrypt.hashSync(password, salt) : '';
    const result = await sql<User>`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${passwordEncrypt}) RETURNING *`;
    return result.rows[0] as User;
  } catch (error) {
    console.error('Failed to create user:', error);
    throw new Error('Failed to create user.');
  }
}

export async function getSession() {
  const session = await auth();
  if (!session) return null;
  return session.user;
}

export async function getStatsWeight(): Promise<WeightData[] | null> {
  try {
    const session = await auth();
    const user_id = session?.user?.id;
    if (!user_id) {
      throw new Error('User session not found.');
    }
    const { rowCount, rows } = await sql<WeightData>`
      SELECT assess.weight, ui.weight_unit, assess.created_at as date
      FROM assessments assess JOIN users_info ui ON assess.user_id=ui.user_id
      WHERE assess.user_id=${user_id};
    `;
    if (rowCount === 0) {
      return null
    }
    return rows as WeightData[];
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return [];
  }
}

// export async function getTagsIds(tags: string[]): Promise<string[]> {
//   const allTagsWordsQueryNums = tags.map((_, i) => `$${i + 1}`).join(", ");
//   const { rows } = await sql`
//     SELECT DISTINCT id FROM tags t
//     JOIN tags_lang tl ON t.id = tl.tag_id
//     WHERE TRIM(LOWER(tl.name)) IN (${allTagsWordsQueryNums})
//   `, [ ...tags ]);
//   return rows.map(({ id }: { id: string }) => id);
// }

export async function getTags(type: string | null, value: string | null, locale: string): Promise<GroupsWorkout[] | null> {
  try {
    const { rowCount, rows: groups } = await sql<GroupsWorkout>`
      SELECT tags.id, tags.type, tl.name,
      tld.name as defaultName
      FROM tags_lang tl JOIN tags ON tags.id = tl.tag_id
      JOIN tags_lang tld ON tags.id = tld.tag_id AND tld.language_id=(
        SELECT code FROM languages WHERE is_default=true
      )
      WHERE CASE WHEN ${typeof type !== "string"} THEN TRUE ELSE tags.type = ${type} END
      AND CASE WHEN ${typeof value !== "string"} THEN TRUE ELSE tags.value = ${value} END
      AND tl.language_id=${locale}
      ORDER BY tags.type ASC, tl.name ASC;
    `;
    if (rowCount === 0) {
      return null
    }
    return groups as GroupsWorkout[];
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return [];
  }
}

export async function getTagName(tagId: string | string[] | undefined, locale: string): Promise<string | null> {
  try {
    if (!tagId) {
      return null;
    }
    // TO DO: Fix this code, to work with multiple tags
    const [tId] = Array.isArray(tagId) ? tagId : [tagId];
    // if (Array.isArray(tagId)) {
    //   const { rowCount, rows: tags } = await sql<{ name: string }>`
    //     SELECT tl.name
    //     FROM tags_lang tl
    //     WHERE tl.tag_id = ANY((Array[${tagId.join(',')}])::uuid[]) AND tl.language_id=${locale};
    //   `;
    //   if (rowCount === 0) {
    //     return null
    //   }
    //   return tags.map(({ name }) => name).join(', ');
    // }
    const { rowCount, rows: tags } = await sql<{ name: string }>`
      SELECT tl.name
      FROM tags_lang tl
      WHERE tl.tag_id=${tId.toString()} AND tl.language_id=${locale};
    `;
    if (rowCount === 0) {
      return null
    }
    return tags[0].name;
  } catch (error) {
    console.error('Failed to fetch tag name:', error);
    return null;
  }
}

export async function getWorkoutIDs(): Promise<string[]> {
  try {
    const { rows } = await sql`SELECT id FROM workouts`;
    return rows.map(({ id }: any) => id);
  } catch (error) {
    console.error('Failed to fetch workout IDs:', error);
    return [];
  }
}

export async function getWorkout(workoutId: string, locale: string): Promise<Workout | null> {
  try {
    const { rowCount, rows: workouts } = await sql<Omit<Workout, 'tags'> & { tags: string}>`
      SELECT workouts.id, wl.name, wl.description, wl.instructions, wl.warnings, (
        SELECT string_agg(CONCAT(tags_lang.name, ':', tags.type), ','  order by tags_lang.name)
        FROM tags JOIN tags_lang ON tags_lang.tag_id = tags.id
        WHERE tags.id = ANY((Array[workouts.tags])::uuid[]) AND tags_lang.language_id=${locale}
      ) as tags, workouts.images
      FROM workouts JOIN workouts_lang wl ON wl.workout_id = workouts.id AND wl.language_id=${locale}
      WHERE workouts.id=${workoutId};
    `;
    if (rowCount === 0) {
      return null
    }
    const workout = workouts[0];
    return {
      ...workout,
      tags: (workout.tags as string)?.split(',').map((tag) => tag.split(':'))
    } as Workout;
  } catch (error) {
    console.error('Failed to fetch workout:', error);
    return null;
  }
}

export async function getWorkouts(searchParams: FilterSearchParams, locale: string): Promise<Workout[] | GroupsWorkout[] | null> {
  try {
    // TO DO: Fix this code, to work with multiple tags
    const [tag] = Array.isArray(searchParams?.tags) ? searchParams?.tags : [searchParams?.tags];
    type WorkoutMod = Omit<Workout, 'tags'> & { tags: string}
    let workouts;
    if (tag) {
      workouts = await sql<WorkoutMod>`
        SELECT workouts.id, wl.name, (
          SELECT string_agg(CONCAT(tags_lang.name, ':', tags.type), ','  order by tags_lang.name)
          FROM tags JOIN tags_lang ON tags_lang.tag_id = tags.id
          WHERE tags.id = ANY((Array[workouts.tags])::uuid[]) AND tags_lang.language_id=${locale}
        ) as tags, workouts.image_banner
        FROM workouts JOIN workouts_lang wl ON wl.workout_id = workouts.id AND wl.language_id=${locale}
        WHERE wl.name ILIKE ${`%${searchParams?.query ?? ''}%`}
        AND ${<string>tag} = ANY((Array[workouts.tags])::uuid[]);
      `;
    } else { // search without tags:: !important refactor this code
      workouts = await sql<WorkoutMod>`
        SELECT workouts.id, wl.name, (
          SELECT string_agg(CONCAT(tags_lang.name, ':', tags.type), ','  order by tags_lang.name)
          FROM tags JOIN tags_lang ON tags_lang.tag_id = tags.id
          WHERE tags.id = ANY((Array[workouts.tags])::uuid[]) AND tags_lang.language_id=${locale}
        ) as tags, workouts.image_banner
        FROM workouts JOIN workouts_lang wl ON wl.workout_id = workouts.id AND wl.language_id=${locale}
        WHERE wl.name ILIKE ${`%${searchParams?.query ?? ''}%`};
      `;
    }
    const { rowCount, rows } = workouts;
    if (rowCount === 0) {
      return null
    }
    return rows.map(({ tags, ...workout}: WorkoutMod) => ({
      ...workout,
      tags: tags?.split(',').map((tag) => tag.split(':'))
    })) as Workout[];
  } catch (error) {
    console.error('Failed to fetch workouts:', error);
    return null;
  }
}

export async function getWorkoutsLiked(): Promise<string[] | null> {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user) {
      return null;
    }
    const { rows } = await sql`
      SELECT workout_id FROM workouts_liked
      WHERE user_id=${user.id} AND enabled=true
    `;
    return rows.map(({ workout_id }: any) => workout_id);
  } catch (error) {
    console.error('Failed to fetch workouts liked:', error);
    return null;
  }
}

export async function setWorkoutsUserLiked(workoutId: string, enabled: boolean): Promise<boolean> {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user) {
      throw new Error('User session not found.');
    }
    if (!workoutId) {
      throw new Error('WorkoutId is empty.');
    }

    await sql`
      INSERT INTO workouts_liked (user_id, workout_id, enabled)
      VALUES (${user.id}, ${workoutId}, ${enabled})
      ON CONFLICT (user_id, workout_id) DO UPDATE
      SET enabled=${enabled};
    `;
    return enabled;
  } catch (error) {
    console.error('Failed to set workout liked:', error);
    throw new Error('Failed to set workout liked.');
  }
}

export async function getUserPlans(locale: string, user_id?: string | null): Promise<Plan[] | null> {
  if (!user_id) return null;
  try {
    type planMod = Omit<Omit<Plan, 'tags'>, 'body_zones'> & { tags: string, body_zones: string, workouts_done: number, workout_days_done: number }
    const { rows, rowCount } = await sql<planMod>`
      SELECT p.id, pl.name, pu.is_current, pl.comments,
      (
        SELECT plans_user_day.day FROM plans_user_day
        WHERE plans_user_day.plan_id=p.id AND user_id=${user_id} AND is_current
      ) as current_day,
      (
        SELECT string_agg(CONCAT(tags_lang.name, ':', tags.id), ',')
        FROM tags JOIN tags_lang ON tags_lang.tag_id = tags.id
        WHERE tags.id = ANY((Array[p.body_zones])::uuid[]) AND tags_lang.language_id=${locale}
      ) as body_zones,
      (
        SELECT string_agg(CONCAT(tags_lang.name, ':', tags.type, ':', tags.value), ','  order by tags_lang.name)
        FROM tags JOIN tags_lang ON tags_lang.tag_id = tags.id
        WHERE tags.id = ANY((Array[p.tags])::uuid[]) AND tags_lang.language_id=${locale}
      ) as tags,
      (
        SELECT COUNT(DISTINCT day)
        FROM plans_user_day WHERE plan_id=p.id AND user_id=${user_id} AND completed
      ) as workouts_done,
      (
        SELECT COUNT(DISTINCT day)
        FROM plans_user_day WHERE plan_id=p.id AND user_id=${user_id}
      ) as workout_days_done
      FROM plans_user pu
      JOIN plans p ON pu.plan_id=p.id
      JOIN plans_lang pl ON pl.plan_id = p.id AND pl.language_id=${locale}
      WHERE pu.user_id=${user_id};
    `;
    if (rowCount === 0) {
      return null;
    }
    return rows.map((plan) => ({
      ...plan,
      workouts_done: ~~rows[0].workouts_done,
      progress: Math.round((rows[0].workouts_done / rows[0].days) * 100),
      body_zones: rows[0].body_zones?.split(',').map((tag: string) => tag.split(':')),
      tags: plan.tags?.split(',').map((tag) => tag.split(':'))
    })) as Plan[];
  } catch (error) {
    console.error('Failed to fetch user plans:', error);
    return null;
  }
}

export async function createUserPlan(user_id: string, plan_id: string, current_day?: number | null): Promise<void> {
  try {
    const { rows, rowCount } = await sql`SELECT id FROM plans_user_day
    WHERE user_id=${user_id} AND plan_id=${plan_id} AND day=${current_day ?? 1}`;

    if ( !rowCount ) {
      await sql`
        INSERT INTO plans_user (user_id, plan_id)
        VALUES (${user_id}::uuid, ${plan_id}::uuid)
        ON CONFLICT (user_id, plan_id) DO UPDATE
        SET updated_at=NOW();
      `;
      await sql`
        INSERT INTO plans_user_day (day, user_id, plan_id, is_current)
        VALUES (${current_day ?? 1}, ${user_id}::uuid, ${plan_id}::uuid, true)
      `;
    } else {
      await sql`UPDATE plans_user_day SET is_current=false
      WHERE user_id=${user_id} AND plan_id=${plan_id}`;

      await sql`UPDATE plans_user_day SET updated_at=NOW(),
        is_current=true WHERE id=${rows[0].id}`;
    }

  } catch (error) {
    console.error('Failed to create plan:', error);
    throw new Error('Failed to create plan.');
  }
}

export async function setAsCurrentPlan(user_id: string, plan_id: string): Promise<string> {
  try {
    if (!user_id) {
      throw new Error('User session not found.');
    }
    await sql`
      UPDATE plans_user
      SET is_current=false
      WHERE user_id=${user_id};
    `;
    await sql`
      UPDATE plans_user
      SET is_current=true
      WHERE user_id=${user_id} AND plan_id=${plan_id};
    `;
    return 'saved';
  } catch (error) {
    console.error('Failed to set current plan:', error);
    return 'error';
  }
}

export async function getUserCurrentPlanWorkouts(locale: string, workingDaySelected?: number): Promise<Exercise[] | null> {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user) {
      return null;
    }
    const plan = await getUserCurrentPlan(locale);
    if (!plan) {
      return null;
    }
    const workingDay = plan.workingDays?.find(({ day, current_day }) => workingDaySelected ? day === workingDaySelected : current_day) as PlanDay;
    const [_, body_zone_id] = plan?.body_zones?.[(workingDay.day - 1) % plan.body_zones.length];
    
    type ExerciseMod = Omit<Exercise, 'tags'> & { tags: string, workouts_complex_ids: string[][]}
    const { rows, rowCount } = await sql<ExerciseMod>`
      SELECT w.id as workout_id, p.id as plan_id, p.workouts_complex as workouts_complex_ids, ${workingDay.day} as day, wc.id, w.image_banner, w.images, wl.name, wl.description,
        (
          SELECT string_agg(CONCAT(tags_lang.name, ':', tags.type), ','  order by tags_lang.name)
          FROM tags JOIN tags_lang ON tags_lang.tag_id = tags.id
          WHERE tags.id = ANY((Array[w.tags])::uuid[]) AND tags_lang.language_id=${locale}
        ) as tags, wc.reps, wc.sets, wc.rest, wc.time, wc.time_unit, wc.weight, wc.weight_unit, wc.total_minutes, wc.recommendations, wc.comments,
        CASE WHEN wc.sets IS NOT NULL THEN wc.sets <= COUNT(puwc.reps) WHEN wc.time IS NOT NULL THEN wc.time <= SUM(puwc.time) ELSE false END AS completed,
        MAX(puwc.created_at) as completed_at, COUNT(puwc.reps) as sets_done, SUM(puwc.time) as time_done
      FROM workouts_complex wc
      JOIN workouts w ON wc.workout_id = w.id
      JOIN workouts_lang wl ON wl.workout_id = w.id AND wl.language_id=${locale}
      JOIN plans_user pu ON pu.user_id=${user.id} AND pu.is_current=true
      JOIN plans p ON pu.plan_id = p.id
      JOIN plans_user_day pud ON pu.plan_id = p.id AND pud.day=${workingDay.day} AND pud.user_id=${user.id}
      LEFT JOIN plans_user_workouts_complex puwc ON puwc.plan_user_day_id = pud.id AND puwc.workout_complex_id = wc.id
      WHERE wc.id = ANY((Array[p.workouts_complex])::uuid[])
        AND ${body_zone_id} = ANY((Array[wc.body_zones])::uuid[])
      GROUP BY w.id, p.id, wc.id, wl.name, wl.description
      ORDER BY wc.name ASC;
    `;
    // TO DO: Change this to a better way to handle this
    if (rowCount === 0) {
      return null;
    }
    const [workoutsComplexIds] = rows[0].workouts_complex_ids;
    const orderedRows = workoutsComplexIds.map((id: string) => rows.find((row: ExerciseMod) => row.id === id)).filter(wc => wc) as ExerciseMod[];
    return orderedRows.map(({ tags, ...exercise}: ExerciseMod) => ({
      ...exercise,
      tags: tags?.split(',').map((tag) => tag.split(':'))
    })) as Exercise[];
  } catch (error) {
    console.error('Failed to fetch current user plan:', error);
    return null;
  }
}

export async function getUserCurrentPlan(locale: string): Promise<Plan | null> {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user) {
      return null;
    }
    const { rows, rowCount } = await sql`
      SELECT p.*, pl.name, pl.comments,
      (
        SELECT plans_user_day.day FROM plans_user_day
        WHERE plans_user_day.plan_id=p.id AND user_id=${user.id} AND is_current
      ) as current_day,
      (
        SELECT string_agg(CONCAT(tags_lang.name, ':', tags.id), ',')
        FROM tags JOIN tags_lang ON tags_lang.tag_id = tags.id
        WHERE tags.id = ANY((Array[p.body_zones])::uuid[]) AND tags_lang.language_id=${locale}
      ) as body_zones,
      (
        SELECT string_agg(CONCAT(tags_lang.name, ':', tags.type, ':', tags.value), ','  order by tags_lang.name)
        FROM tags JOIN tags_lang ON tags_lang.tag_id = tags.id
        WHERE tags.id = ANY((Array[p.tags])::uuid[]) AND tags_lang.language_id=${locale}
      ) as tags,
      (
        SELECT COUNT(DISTINCT day)
        FROM plans_user_day WHERE plan_id=p.id AND user_id=${user.id} AND completed
      ) as workouts_done,
      (
        SELECT COUNT(DISTINCT day)
        FROM plans_user_day WHERE plan_id=p.id AND user_id=${user.id}
      ) as workout_days_done
      FROM plans_user pu
      JOIN plans p ON pu.plan_id = p.id
      JOIN plans_lang pl ON pl.plan_id = p.id AND pl.language_id=${locale}
      WHERE pu.user_id=${user.id} AND pu.is_current=true LIMIT 1;
    `;
    if (rowCount === 0) {
      return null;
    }
    const plan = {
      ...rows[0],
      progress: Math.round((rows[0].workouts_done / rows[0].days) * 100),
      body_zones: rows[0].body_zones?.split(',').map((tag: string) => tag.split(':')),
      tags: rows[0].tags?.split(',').map((tag: string) => tag.split(':'))
    } as Plan;
    const workingDays = await getUserPlanDays(plan as Plan, locale) ?? [];

    return {
      ...plan,
      workingDays
    };
  } catch (error) {
    console.error('Failed to fetch user plans:', error);
    return null;
  }
}

export async function getUserPlanDays(plan: Plan, locale: string): Promise<PlanDay[] | null> {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user) {
      return null;
    }
    const { rows, rowCount } = await sql<PlanDay>`
      SELECT pud.*, pl.name, pl.comments,
      (
        SELECT COUNT(plans_user_workouts_complex.id)
        FROM workouts_complex
        JOIN plans ON workouts_complex.id=ANY((Array[plans.workouts_complex])::uuid[])
        LEFT JOIN plans_user ON plans_user.plan_id=plans.id
        LEFT JOIN plans_user_workouts_complex ON plans_user_workouts_complex.plan_user_day_id=pud.id
          AND plans_user_workouts_complex.workout_complex_id=workouts_complex.id
        WHERE plans_user.plan_id=pud.plan_id AND plans_user.user_id=pud.user_id
        AND p.body_zones[1][((pud.day - 1) % ARRAY_LENGTH(p.body_zones, 2)) + 1] = ANY((Array[workouts_complex.body_zones])::uuid[])
      ) as workouts_done,
      (
        SELECT SUM(COALESCE(workouts_complex.sets, 1))
        FROM workouts_complex
        JOIN plans ON workouts_complex.id=ANY((Array[plans.workouts_complex])::uuid[])
        LEFT JOIN plans_user ON plans_user.plan_id=plans.id
        WHERE plans_user.plan_id=pud.plan_id AND plans_user.user_id=pud.user_id
        AND p.body_zones[1][((pud.day - 1) % ARRAY_LENGTH(p.body_zones, 2)) + 1] = ANY((Array[workouts_complex.body_zones])::uuid[])
      ) as workouts_total,
      pud.is_current as current_day
      FROM plans_user_day pud
      JOIN plans_user pu ON pud.plan_id = pu.plan_id AND pud.user_id = pu.user_id
      JOIN plans p ON pud.plan_id = p.id
      JOIN plans_lang pl ON pl.plan_id = p.id AND pl.language_id=${locale}
      WHERE pud.user_id=${user.id} AND pud.plan_id=${plan.id}
      ORDER BY pud.day ASC;
    `;
    if (rowCount === 0) {
      return null;
    }
    const rest = plan.days - rowCount;
    const maxLength = rowCount < plan.body_zones.length
      ? (plan.body_zones.length - rowCount) || 1 : 1;
    const length = Math.min(rest, maxLength);
    return [
      ...rows.map((row: PlanDay) => ({
        ...row,
        percentage: row.workouts_total ? Math.round((row.workouts_done / row.workouts_total) * 100) : 0
      })),
      ...Array.from({ length }, (_, d) => ({day: d + rowCount + 1}))
    ] as PlanDay[];
  } catch (error) {
    console.error('Failed to fetch user plans days:', error);
    return null;
  }
}

export async function setWorkoutItem(form: {[k: string]: FormDataEntryValue;}): Promise<string> {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user) {
      throw new Error('User session not found.');
    }

    const { rows: workoutComplexRows, rowCount: workoutComplexRowsCount } = await sql<WorkoutComplex>`SELECT * FROM workouts_complex WHERE id=${<string>form.workout_complex_id}`;
    if (workoutComplexRowsCount === 0) {
      throw new Error('Workout complex not found.');
    }
    const workoutComplex = workoutComplexRows[0];

    const { rows: planRows, rowCount: planRowsCount } = await sql<Plan>`
      SELECT p.* FROM plans p
      JOIN plans_user pu ON pu.plan_id=p.id
      WHERE p.id=${<string>form.plan_id}
    `;
    if (planRowsCount === 0) {
      throw new Error('Workout complex not found.');
    }
    const plan = planRows[0];
    if (plan.days < parseInt(<string>form.day)) {
      throw new Error('Day out of range.');
    }

    const { rows, rowCount } = await sql<PlanDay>`
      SELECT id FROM plans_user_day
      WHERE plan_id=${<string>plan.id} AND user_id=${user?.id}
      AND day=${parseInt(<string>form.day)}
    ;`;

    if ( rowCount === 0) {
      throw new Error('Error searching id on plans_user_day')
    }

    // TO DO: rest, rest_between, rest_sets I DON'T KNOW HOW TO HANDLE THIS YET
    await sql`INSERT INTO plans_user_workouts_complex
      (plan_user_day_id, reps, time, time_unit,
        weight, weight_unit, workout_id, workout_complex_id)
      VALUES (
        ${rows[0].id},
        ${<string>form.reps ?? null},
        ${<string>form.time ?? null},
        ${workoutComplex.time_unit},
        ${<string>form.weight ?? null},
        ${workoutComplex.weight_unit},
        ${workoutComplex.workout_id},
        ${workoutComplex.id}
      )`;
    return 'saved';
  } catch (error) {
    console.log(error);
    return 'error';
  }
}

export async function getWorkoutItems(workout_id: string): Promise<WorkoutComplex[] | null> {
  try {
    const { rows, rowCount } = await sql<WorkoutComplex>`
      SELECT puwc.* FROM plans_user_workouts_complex puwc
      JOIN workouts_complex wc ON puwc.workout_complex_id=wc.id
      WHERE puwc.workout_id=${workout_id}
      ORDER BY puwc.created_at DESC;
    `;
    if (rowCount === 0) {
      return null;
    }
    return rows;
  } catch (error) {
    console.error('Failed to fetch workout item:', error);
    return null;
  }

}

export async function setWorkoutCloseDay(form: {[k: string]: FormDataEntryValue;}): Promise<ActionFormState> {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user) {
      throw new Error('User session not found.');
    }

    const plan = await getUserCurrentPlan('en');
    if (!plan) {
      throw new Error('Current Plan not found.');
    }

    const workingDayData= plan.workingDays?.find(({ current_day }) => current_day) as PlanDay;
    if (!workingDayData) {
      throw new Error('Workouts complex not found.');
    }

    await sql`UPDATE plans_user_day
      SET is_current=false,
          completed=true,
          completed_at=NOW(),
          percentage=${workingDayData.percentage},
          updated_at=NOW()
      WHERE is_current AND plan_id=${plan.id} AND user_id=${user.id}
    `;

    const new_current_day = (plan.current_day ?? 1) + 1;
    await sql`INSERT INTO plans_user_day (day, plan_id, user_id, completed, percentage, created_at, updated_at, is_current)
      VALUES (${new_current_day}, ${plan.id}, ${user.id}, false, 0, NOW(), NOW(), true)
      ON CONFLICT (day, plan_id, user_id) DO UPDATE
      SET is_current=true, updated_at = NOW()
      RETURNING day
    ;`

    return { status: 'success'};
  } catch (error: any) {
    return {
      status: 'error',
      message: `Error on close day: ${error?.message}`
    };
  }
}

function convertUTCToLocal(date: Date): Date {
  return (new Date(Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  )));
}

export async function getUserPlanStartedAt(): Promise<string | null> {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user) {
      throw new Error('User session not found.');
    }

    const { rows, rowCount } = await sql`
      SELECT pud.started_at FROM plans_user pu
      JOIN plans p ON pu.plan_id=p.id
      JOIN plans_user_day pud ON pu.plan_id=pud.plan_id
        AND pud.user_id = ${user.id}
        AND pud.is_current
      WHERE pu.user_id = ${user.id} AND pu.is_current
    `;
    return rowCount === 0 ? null : convertUTCToLocal(rows[0]?.started_at).toString();
  } catch (error) {
    return 'error';
  }
}

export async function setUserPlanStartedAt(): Promise<string | null> {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user) {
      throw new Error('User session not found.');
    }

    const { rows: planRows, rowCount: planRowsCount } = await sql<Plan>`
      SELECT p.id, (
        SELECT plans_user_day.day FROM plans_user_day
        WHERE plans_user_day.plan_id=p.id AND user_id=${user.id} AND is_current
      ) as current_day
      FROM plans_user pu
      JOIN plans p ON pu.plan_id=p.id
      WHERE pu.user_id = ${user.id} AND pu.is_current
    `;
    if (planRowsCount === 0) {
      throw new Error('Workout complex not found.');
    }
    const plan = planRows[0];
    const { rows, rowCount } =  await sql`UPDATE plans_user_day
      SET started_at=NOW()
      WHERE day=${plan.current_day} AND plan_id=${plan.id} AND user_id=${user.id}
      RETURNING started_at;
    `;
    return rowCount === 0 ? null : convertUTCToLocal(rows[0]?.started_at).toString()
  } catch (error) {
    return "error";
  }
}

export async function saveAssessment(formData: FormData): Promise<{assessment_id: string, user_id: string | undefined}>{
  const form = Object.fromEntries(Array.from(formData.entries()));
  const session = await auth();
  const user = session?.user;
  try {
    const [weight, height] = (<string>form['weight&height']).split(',').map((v) => parseInt(v));
    const result = await sql`INSERT INTO assessments
      (gender, birthdate, weight, height, goal, training, gym, frequency, health, user_id)
      VALUES (
        ${<string>form.gender},
        ${<string>form.birthdate},
        ${<number>weight},
        ${<number>height},
        ${<string>form.goal},
        ${<string>form.training},
        ${<string>form.gym},
        ${<string>form.frequency},
        ${<string>form.health},
        ${user?.id}
      ) RETURNING id, gender, birthdate`;
    const { id, gender, birthdate } = result.rows[0];
    if (user) {
      await sql`UPDATE users
        SET gender=${<string>gender}, birthdate=${<string>birthdate}
        WHERE id=${user.id}`;
      await sql`UPDATE users_info SET assessment=${true} WHERE user_id=${user.id}`;
    }
    return {assessment_id: id, user_id: user?.id};
  } catch (error) {
    console.error('Failed to insert assessment:', error);
    throw new Error('Failed to insert assessment.');
  }
}

export async function saveAssessmentById(assessmentCookie: RequestCookie | undefined): Promise<void>{
  const session = await auth();
  const user = session?.user;
  try {
    if (!user) {
      throw new Error('User session not found.');
    }
    const assessmentId = assessmentCookie?.value;
    console.log('assessmentId:', assessmentId);
    if (assessmentId) { 
      const { rowCount } = await sql`SELECT * FROM assessments WHERE id=${assessmentId} AND user_id IS NULL`;
      if (rowCount === 0) {
        throw new Error('Assessment not found.');
      }
      await sql`UPDATE users_info
        SET assessment=${true}
        WHERE user_id=${user.id}`;
    }
  } catch (error) {
    console.error('Failed to update user assessment:', error);
    throw new Error('Failed to update user assessment.');
  }
}

export async function saveDashboard(dashboard?: string): Promise<ActionFormState>{
  const session = await auth();
  const user = session?.user;
  try {
    if (dashboard && user) {
      await sql`UPDATE users_info
        SET dashboard=${dashboard}
        WHERE user_id=${user.id}`;
    }
    return { status: 'success' };
  } catch (error) {
    console.error('Failed to update user dashboard:', error);
    throw new Error('Failed to update user dashboard.');
  }
}
export async function saveTheme(formData: FormData): Promise<{theme: string, user_id: string | undefined}>{
  const form = Object.fromEntries(Array.from(formData.entries()));
  const session = await auth();
  const user = session?.user;
  try {
    const theme = <string>form['theme-dropdown'];
    if (THEMES.includes(theme) && user) {
      await sql`UPDATE users_info
        SET theme=${theme}
        WHERE user_id=${user.id}`;
    }
    return { theme, user_id: user?.id };
  } catch (error) {
    console.error('Failed to update user theme:', error);
    throw new Error('Failed to update user theme.');
  }
}
export async function saveOnBoarding(): Promise<void>{
  const session = await auth();
  const user = session?.user;
  try {
    if (!user) {
      throw new Error('User session not found.');
    }
    await sql`UPDATE users_info
      SET onboarding=${true}
      WHERE user_id=${user.id}`;
  } catch (error) {
    console.error('Failed to update user onboarding:', error);
    throw new Error('Failed to update user onboarding.');
  }
}

export async function getUsersWithSubscription(): Promise<User[]>{
  try {
    const { rows } = await sql`SELECT u.id, u.name, u.email, u.image FROM users u
    JOIN notification_subscriptions ns ON u.id=ns.user_id`;
    return rows;
  } catch (error) {
    console.error('Failed to fetch users with subscription:', error);
    return [];
  }
}

export async function setSubscriptionNotification(subscription: any): Promise<void>{
  const session = await auth();
  const user = session?.user;
  if (!user) throw new Error("Forbidden");
  if (!subscription.keys.auth || !subscription.keys.p256dh) throw new Error("Subsciption error");

  const { rows } = await sql`
    SELECT subscription::json->'keys'->'auth' as auth, subscription::json->'keys'->'p256dh' as p256dh
    FROM notification_subscriptions
    WHERE user_id=${user.id}
  ;`;
  const alreadyInserted = rows.some(({auth, p256dh}) => (
    auth == subscription.keys.auth && p256dh == subscription.keys.p256dh
  ));
  if (alreadyInserted) return;
  await sql`INSERT INTO notification_subscriptions (subscription, user_id) VALUES (${subscription}, ${user.id})`;
}

export async function getSubscription(user_id: string): Promise<any>{
  const { rows, rowCount } = await sql`SELECT subscription FROM notification_subscriptions WHERE user_id=${user_id}`;
  if (rowCount === 0) {
    return null;
  }
  return rows;
}

export async function wait (ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}