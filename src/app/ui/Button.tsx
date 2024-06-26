type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}
export default function Button({children, ...props}: Props) {
  return (
    <button {...props} className="btn btn-ghost blue-lineal text-white font-bold rounded-2xl w-full">{ children }</button>
  )
}