'use client'

import { handleDeleteCookies } from "@/lib/actions";

export default function DeleteAllCookies() {
  return (
    <form action={handleDeleteCookies}>
      <button type="submit" className="btn btn-primary">Delete All Cookies</button>
    </form>
  )
}