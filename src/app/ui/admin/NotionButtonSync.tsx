import { NotionSync } from "@/lib/notion";
import { FolderSyncIcon } from "lucide-react";

export default function NotionButtonSync() {

  async function sync(formData: FormData) {
    'use server'
    // Mutate data
    const noFilter = formData.get('filter') === '1';
    const notionPages = new NotionSync('/admin');
    noFilter && (notionPages.database_filter = {
      or: ["En progreso", "Guardado", "Error"].map((status) => ({
        type: "status",
        property: "Estatus",
        status: {
          equals: status
        }
      }))
    });
    const sync = await notionPages.sync();
    console.log({noFilter})
  }

  return (
    <form action={sync} className="form-control w-full space-y-2">
      <h2>Sync Notion</h2>
      <label className="label cursor-pointer">
        <span className="label-text">Full data</span>
        <input type="checkbox" name="filter" className="toggle toggle-md toggle-secondary" value="1" />
      </label>
      <button type="submit" className="btn">Sync <FolderSyncIcon className="size-4" /></button>
    </form>
  )
}