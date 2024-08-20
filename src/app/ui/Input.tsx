export default function Input({ children }: { children: React.ReactNode }) {
  return (
    <label className="input input-bordered flex items-center gap-2">
      { children }
    </label>
  )
}