interface RatingStarProps extends React.HTMLAttributes<HTMLInputElement>{
  stars: number;
  size?: keyof typeof sizes;
  lenght?: number;
  name: string;
}

export default function RatingStar({ stars, name, size, lenght, ...props }: RatingStarProps) {
  const ratingClass = size || "default";
  return (
    <div className={ sizes[ratingClass] }>
      { Array.from({ length: (lenght ?? 5) + 1 }).map((_, index) => (
        <input {...props}
          key={`ratingstart${name}${index}`}
          type="radio" className={index ? "mask mask-star-2 bg-primary" : "rating-hidden"}
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