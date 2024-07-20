import { getWorkoutItems } from "@/lib/data";

type HistoryTableProps = {
  workout_id: string;
}

export default async function HistoryTable({ workout_id }: HistoryTableProps) {
  const history = await getWorkoutItems(workout_id);
  return (
    <div className="overflow-x-auto">
      <table className="table table-xs">
        { history?.map(({ reps, weight, weight_unit, time, time_unit, created_at }, index) => (
          <>
            <thead className="bg-neutral text-neutral-content">
              <tr>
                <th colSpan={3}>{ created_at?.toLocaleString() }</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{ index + 1 }</th>
                <td>{ !reps ? `${time} ${time_unit}` : `${weight} ${weight_unit} x ${reps} reps` }</td>
                <td>{ `${created_at?.getHours().toString().padEnd(2, "0")}:${created_at?.getMinutes().toString().padEnd(2, "0")}` }</td>
              </tr>
            </tbody>
          </>
        )) }
      </table>
    </div>
  )
}