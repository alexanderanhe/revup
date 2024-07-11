import { format } from "date-fns";
import bcrypt from 'bcryptjs';
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

import { THEMES, User as LocalUser, UserInfo, Workout, GroupsWorkout, FilterSearchParams, Plan, PlanDay } from "@/lib/definitions";
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

// export async function findUserByEmail({email, includePassword}: {email: string, includePassword: boolean}) {
//   await wait(2000);

//   return {
//     _id: '629924078f28b719d95f61af',
//     email: 'alex.angulo@gmail.com',
//     password: '123456'
//   }
// }

// export async function comparePassword(password: string, hash: string) {
//   await wait(2000);

//   return password === hash;
// }

export async function getUser(email: string): Promise<any> {
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
    const userInfo = await sql<User>`
      SELECT TRIM(ui.theme) as theme, ui.onboarding, ui.assessment,
        CASE WHEN ua.gender = 'M' THEN 'male' WHEN ua.gender = 'F' THEN 'female' ELSE 'other' END AS gender,
        TO_CHAR(ua.birthdate, 'yyyy-mm-dd') as birthdate, ua.weight, ua.height, ua.goal, date_part('year', age(ua.birthdate)) as age
      FROM users_info ui LEFT OUTER JOIN assessments ua ON ui.user_id = ua.user_id WHERE ui.user_id=${user_id}`;
    if (userInfo.rowCount === 0) {
      return null
    }
    return userInfo.rows[0] as UserInfo;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}

export async function createUser({name, email, password}: LocalUser): Promise<User> {
  try {
    const passwordEncrypt = password ? bcrypt.hashSync(password, 10) : '';
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

// export async function getTagsIds(tags: string[]): Promise<string[]> {
//   const allTagsWordsQueryNums = tags.map((_, i) => `$${i + 1}`).join(", ");
//   const { rows } = await sql`
//     SELECT DISTINCT id FROM tags t
//     JOIN tags_lang tl ON t.id = tl.tag_id
//     WHERE TRIM(LOWER(tl.name)) IN (${allTagsWordsQueryNums})
//   `, [ ...tags ]);
//   return rows.map(({ id }: { id: string }) => id);
// }

export async function getTags(type: string, locale: string): Promise<GroupsWorkout[] | null> {
  try {
    const { rowCount, rows: groups } = await sql<GroupsWorkout>`
      SELECT tags.id, tags.type, tl.name,
      tld.name as defaultName
      FROM tags_lang tl JOIN tags ON tags.id = tl.tag_id
      JOIN tags_lang tld ON tags.id = tld.tag_id AND tld.language_id=(
        SELECT code FROM languages WHERE is_default=true
      )
      WHERE tags.type=${type} AND tl.language_id=${locale};
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
    const { rowCount, rows: tags } = await sql<{ name: string }>`
      SELECT tl.name
      FROM tags_lang tl
      WHERE tl.tag_id=${tagId.toString()} AND tl.language_id=${locale};
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
    const tag = String(searchParams?.tags ?? '');
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
    return rows.map(({ tags, ...workout}: Omit<Workout, 'tags'> & { tags: string}) => ({
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

export async function getUserCurrentPlan(locale: string): Promise<Plan | null> {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user) {
      return null;
    }
    const { rows, rowCount } = await sql`
      SELECT p.*, pl.name, pl.comments, pu.current_day,
      (
        SELECT string_agg(DISTINCT tl.name, ',')
        FROM workouts_complex wc
        JOIN tags t ON t.id = wc.body_zone
        JOIN tags_lang tl ON tl.tag_id = t.id AND tl.language_id=${locale}
        WHERE wc.id = ANY((Array[p.workouts_complex])::uuid[])
      ) as body_zones,
      (
        SELECT string_agg(wl.name, '::'  order by workouts_complex.name)
        FROM workouts_complex
        JOIN workouts w ON workouts_complex.workout_id = w.id
        JOIN workouts_lang wl ON wl.workout_id = w.id AND wl.language_id=${locale}
        WHERE workouts_complex.id = ANY((Array[p.workouts_complex])::uuid[])
      ) as workouts_complex,
      (
        SELECT string_agg(CONCAT(tags_lang.name, ':', tags.type, ':', tags.value), ','  order by tags_lang.name)
        FROM tags JOIN tags_lang ON tags_lang.tag_id = tags.id
        WHERE tags.id = ANY((Array[p.tags])::uuid[]) AND tags_lang.language_id=${locale}
      ) as tags
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
      body_zones: rows[0].body_zones?.split(','),
      workouts_complex: rows[0].workouts_complex?.split('::'),
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
    const { rows, rowCount } = await sql`
      SELECT pud.*, pl.name, pl.comments,
      CASE
        WHEN pud.day = pu.current_day THEN true
        ELSE false
      END as current_day
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
    const maxLength = (plan.body_zones.length - 1) || 1;
    const length = Math.min(rest, maxLength);
    return [
      ...rows,
      ...Array.from({ length }, (_, d) => ({day: d + rowCount + 1}))
    ] as PlanDay[];
  } catch (error) {
    console.error('Failed to fetch user plans days:', error);
    return null;
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

export async function wait (ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}