import { format } from "date-fns";
import bcrypt from 'bcryptjs';
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

import { THEMES, User as LocalUser, UserInfo, Workout, GroupsWorkout } from "@/lib/definitions";
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

export async function getWorkouts(
  lang: string,
  opts: { match?: any, filters?: any, groupBy?: any}
): Promise<Workout[] | GroupsWorkout[] | null> {
  try {
    if (opts.groupBy.length) {
      const { rowCount, rows: groups } = await sql<GroupsWorkout>`
        SELECT tags.id, tags.type, tl.name,
        tld.name as defaultName
        FROM tags_lang tl JOIN tags ON tags.id = tl.tag_id
        JOIN tags_lang tld ON tags.id = tld.tag_id AND tld.language_id=(
          SELECT code FROM languages WHERE is_default=true
        )
        WHERE tags.type=${opts.groupBy[0].tags} AND tl.language_id=${lang};
      `;
      if (rowCount === 0) {
        return null
      }
      return groups as GroupsWorkout[];
    }
    const { rowCount, rows: workouts } = await sql<Workout>`
      SELECT workouts.id, wl.name, wl.description, wl.instructions, wl.warnings, (
        SELECT string_agg(tags_lang.name, ','  order by tags_lang.name)
        FROM tags JOIN tags_lang ON tags_lang.tag_id = tags.id
        WHERE tags.id  = ANY((Array[workouts.tags])::uuid[])
      ) as tags, workouts.images
      FROM workouts JOIN workouts_lang wl ON wl.workout_id = workouts.id AND wl.language_id=${lang};
    `;
    if (rowCount === 0) {
      return null
    }
    return workouts.map(({ tags, ...workout}: Workout) => ({
      ...workout,
      tags: (tags as string)?.split(',')
    })) as Workout[];
  } catch (error) {
    console.error('Failed to fetch workouts:', error);
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