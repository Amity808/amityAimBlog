import React from 'react'
import Link from 'next/link'
import getFormattedPostDate from '@/lib/getFormattedDate'

type Props = {
    post: BlogPost
}

export default function ListItem({ post }: Props) {
    const { id, title, date } = post
    const formattedDate = getFormattedPostDate(date)
  return (
    <li className='mt-4 text-2xl dark:text-white/90' key={id}>
        <Link href={`posts/${id}`} className='underline hover:text-black/70 dark:hover:text-white'>{title}</Link>
        <br />
        <p className=' text-sm mt-1'>{formattedDate}</p>
    </li>
  )
}