import { fetchHealth } from "@/lib/admin-data/data";
import AdminHealthPage from "./component";

export default async function HealthPage() {
  const item = await fetchHealth();
  return (
    <>
      <AdminHealthPage news={item} />
    </>
  );
}
