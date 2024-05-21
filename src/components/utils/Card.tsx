import Image from 'next/image'

type CardProps = {
  title: string;
  description: string;
  image: string;
  contentType: string;
}

const Card = ({title, description, image, contentType}: CardProps) => {
  const type = contentType === 'autofit' ? 'aspect-16/9' : 'aspect-square';

  return (
    <div className="card before:!bg-black/50 w-full shadow-xl image-full">
      <figure className={type}>
        <Image
          src={image}
          alt={title}
          width={300}
          height={200}
          className="w-full rounded-t-lg object-cover"
        />
      </figure>
      <div className="card-body justify-end">
        <h2 className="card-title text-white">{ title }</h2>
        {/* <p className='text-white'>{ description }</p> */}
      </div>
    </div>
  )
}

export default Card