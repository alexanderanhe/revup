'use client'

import { HeartIcon, ChatBubbleOvalLeftIcon, ArrowUpOnSquareIcon } from '@heroicons/react/24/solid'

import styles from './styles.module.css'
import { Drawer } from 'vaul'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { Link } from '@/navigation'

type VideoPlayerActionsProps = {
  username: string
  avatar: string
  likes?: number
  comments?: number
  shares?: number
  hearted?: boolean
}
export default function VideoPlayerActions ({ username, avatar, likes = 2041, comments = 333, shares = 520, hearted = false }: VideoPlayerActionsProps) {
  const handleLike = () => {
    window.alert('like')
  }

  const handleComment = () => {
    window.alert('comment')
  }

  const handleShare = () => {
    window.alert('share')
  }

  return (
    <aside className={styles.actions}>

      <div className={styles.user}>
        <img alt={username} src={avatar} />
        <img src='https://sf16-scmcdn-va.ibytedtos.com/goofy/tiktok/web/node/_next/static/images/test-2e6dd40439e72f09a8193e27cb3e0c51.svg' width='24' />
      </div>

      <button onClick={handleLike} className={styles.action}>
        <HeartIcon className='size-8' />
        <span title='like'>{likes}</span>
      </button>

      {/* <button onClick={handleComment} className={styles.action}>
        <ChatBubbleOvalLeftIcon className='size-8' />
        <span title='comments'>{comments}</span>
      </button> */}
      <CommentButton comments={comments} />

      <button onClick={handleShare} className={styles.action}>
        <ArrowUpOnSquareIcon className='size-8' />
        <span title='shares'>{shares}</span>
      </button>
    </aside>
  )
}

type CommentButtonProps = {
  comments: number
}

function CommentButton({ comments }: CommentButtonProps) {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <Drawer.Root
      shouldScaleBackground
    >
      <Drawer.Overlay className="fixed inset-0 bg-black/60" />
      <Drawer.Trigger className={styles.action}>
        <ChatBubbleOvalLeftIcon className='size-8' />
        <span title='comments'>{comments}</span>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Content className="fixed flex flex-col bg-base-100 border border-base-300 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-[80%] mx-[-1px] z-30">
          {/* <div className="flex-none mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-base-300 mb-6 mt-4" /> */}
          <div className="content-grid mx-auto w-full h-full p-4 pt-5">
            <div className="flex flex-col gap-2 w-full h-full">
              <div className="flex justify-center font-medium">{ comments } comentarios</div>
              <div className="overflow-auto grow">
                { Array.from({ length: 5 }).map((_, i) => (
                  <div key={`comment${i}`} className="flex items-start w-full font-medium gap-2">
                    <Link href={`/user/${user?.id}`} className="avatar">
                      <div className="size-10 rounded-full">
                        <Image width={40} height={40} alt={user?.name ?? ""} src={user?.image ?? ""} />
                      </div>
                    </Link>
                    <div>
                      <a href="#" className="text-gray-700">{user?.name ?? ""}</a>
                      <p>Este es un comentario Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col text-2xl gap-3">
                <ul className='flex justify-between'>
                  <li>😄</li>
                  <li>🥰</li>
                  <li>😂</li>
                  <li>😳</li>
                  <li>😏</li>
                  <li>😅</li>
                  <li>🥺</li>
                </ul>
                <div className="flex items-center w-full gap-2">
                  <div className="avatar">
                    <div className="size-10 rounded-full">
                      <Image width={40} height={40} alt={user?.name ?? ""} src={user?.image ?? ""} />
                    </div>
                  </div>
                  <label className="input input-bordered input-md bg-secondary rounded-full grow flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Añadir comentario..." />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}