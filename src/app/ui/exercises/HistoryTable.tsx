import { getWorkoutItems } from "@/lib/data";
import { WorkoutComplex } from "@/lib/definitions";
import { Fragment } from "react";

type HistoryTableProps = {
  workout_id: string;
}
type HistoryGroup = {
  [key: string]: (WorkoutComplex & { ts_time: string })[]
}

export default async function HistoryTable({ workout_id }: HistoryTableProps) {
  const histories = await getWorkoutItems(workout_id);
  const grouped = histories?.reduce((acc, { created_at, ...rest }) => {
    const key = created_at?.toLocaleDateString();
    if (!key) {
      return acc;
    }
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push({
      ...rest,
      ts_time: created_at?.toLocaleTimeString() ?? ''
    });
    return acc;
  }, {} as HistoryGroup);
  return (
    <div className="overflow-x-auto">
      <table className="table table-xs">
        { grouped && Object.entries(grouped).map(([ts_date, history]) => (
          <Fragment key={`history${ts_date}`}>
            <thead className="bg-neutral text-neutral-content">
              <tr>
                <th colSpan={3}>{ ts_date }</th>
              </tr>
            </thead>
            { history?.map(({ reps, weight, weight_unit, time, time_unit, ts_time }, index) => (
              <tbody key={`history${ts_date}_${ts_time}${index}`}>
                <tr>
                  <th>{ index + 1 }</th>
                  <td>{ !reps ? `${time} ${time_unit}` : `${weight} ${weight_unit} x ${reps} reps` }</td>
                  <td width={90}>{ ts_time }</td>
                </tr>
              </tbody>
            ))}
          </Fragment>
        ))}
      </table>
    </div>
  )
}