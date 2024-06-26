export default function Input({ children }: { children: React.ReactNode }) {
  return (
    <label className="input input-bordered bg-[#F7F8F8] flex items-center gap-2">
      { children }
    </label>
  )
}