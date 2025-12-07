import { fetchShows } from "@/lib/admin-data/data";
import AdminShows from "./shows";

export default async function Page() {
  const shows = await fetchShows();
  return <AdminShows shows_={shows} />;
}
