interface RatingStarProps extends React.HTMLAttributes<HTMLInputElement>{
  stars: number;
  size?: keyof typeof sizes;
  lenght?: number;
  color?: string;
  name: string;
}

export default function RatingStar({ stars, name, size, lenght, color, ...props }: RatingStarProps) {
  const ratingClass = size || "default";
  return (
    <div className={ sizes[ratingClass] }>
      { Array.from({ length: (lenght ?? 5) + 1 }).map((_, index) => (
        <input {...props}
          key={`ratingstart${name}${index}`}
          type="radio" className={index ? colors[color as keyof typeof colors ?? 'default'] : "rating-hidden hidden"}
          defaultChecked={index === stars}
        />
      ))}
    </div>
  )
}

const sizes = {
  default: "rating",
  xs: "rating rating-xs",
  sm: "rating rating-sm",
  md: "rating rating-md",
  lg: "rating rating-lg",
}

const colors = {
  default: "mask mask-star-2",
  primary: "mask mask-star-2 bg-primary",
  "base-100": "mask mask-star-2 bg-base-100",
  "neutral-content": "mask mask-star-2 bg-neutral-content",
  secondary: "mask mask-star-2 bg-secondary",
  success: "mask mask-star-2 bg-success",
  danger: "mask mask-star-2 bg-danger",
  warning: "mask mask-star-2 bg-warning",
  info: "mask mask-star-2 bg-info",
  white: "mask mask-star-2 bg-white",
  black: "mask mask-star-2 bg-black",
};