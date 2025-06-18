import Navbar from "../components/FloatingNav";
import WelcomeCard from "../components/WelcomeCard";
import PromoGrid from "../components/PromoGrid";
import UserProfileCard from "../components/UserProfileCard";
import CombosSection from "../components/CombosSection";
import UserCoupons from "../components/UserCoupons";
import { ReactElement } from "react";

export default function Dashboard(): ReactElement {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-neutral-800 text-white">
      <Navbar />
      <div className="pt-40 container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 ml-40">
            <WelcomeCard />
          </div>
          <div className="lg:col-span-1 -ml-10 max-w-sm">
            <UserProfileCard
              name="Mauricio Heredia"
              points={1250}
              coupons={8}
            />
          </div>
        </div>
        <PromoGrid />
        <CombosSection />
        <UserCoupons />
      </div>
    </div>
  );
}
