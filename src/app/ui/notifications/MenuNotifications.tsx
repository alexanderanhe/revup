import DetailIcon from "@/components/utils/icons/DetailIcon";

export default function MenuNotifications() {
  return (
    <button type="button" className="btn btn-square rounded-lg">
      <DetailIcon className="size-2.5 [&>circle]:fill-current" />
    </button>
  )
}