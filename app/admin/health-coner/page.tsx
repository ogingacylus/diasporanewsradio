import { fetchHealth } from "@/lib/admin-data/data";
import AdminHealthPage from "./component";

export const dynamic = "force-dynamic";

export default async function HealthPage() {
  const item: any = await fetchHealth();
  return (
    <>
      <AdminHealthPage news={item} />
    </>
  );
}
