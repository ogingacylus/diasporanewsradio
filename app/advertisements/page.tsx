import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Advertisements from "@/components/page-components/advertisments";
import { fetchPremiumAds, fetchLocalAds } from "@/lib/client-data/data";

export const dynamic = "force-dynamic";
export default async function AdvertisementsPage() {
  const premium = await fetchPremiumAds();
  const local = await fetchLocalAds();
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Advertisements filteredPremium={premium} filteredLocal={local} />
      <Footer />
    </div>
  );
}
