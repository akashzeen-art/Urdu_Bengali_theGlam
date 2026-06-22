import { useState } from "react";
import Navbar from "@/components/Navbar";
import VideoBackground from "@/components/VideoBackground";
import SubscriptionModal from "@/components/SubscriptionModal";
import PlanModal from "@/components/PlanModal";
import Footer from "@/components/Footer";
import { User, LogIn } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Account() {
  const { t } = useLanguage();
  const [subscriptionModal, setSubscriptionModal] = useState(false);
  const [planModal, setPlanModal] = useState({ isOpen: false, mobile: "" });

  const handleSignIn = () => {
    setSubscriptionModal(true);
  };

  const handleSubscription = (mobile: string) => {
    setSubscriptionModal(false);
    setPlanModal({ isOpen: true, mobile });
  };

  const handlePlanSelection = (plan: string) => {
    console.log("Selected plan:", plan, "Mobile:", planModal.mobile);
    setPlanModal({ isOpen: false, mobile: "" });
  };

  return (
    <div className="relative min-h-screen bg-yoga-cream">
      <VideoBackground />
      <SubscriptionModal
        isOpen={subscriptionModal}
        onClose={() => setSubscriptionModal(false)}
        onSubmit={handleSubscription}
      />
      <PlanModal
        isOpen={planModal.isOpen}
        onClose={() => setPlanModal({ isOpen: false, mobile: "" })}
        onSubmit={handlePlanSelection}
        mobile={planModal.mobile}
        email=""
        name="olivemint"
        txnid=""
      />

      <div className="relative z-20">
        <Navbar />

        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12 animate-slide-up">
              <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
                {t.account.title} <span className="text-purple-500">{t.account.titleHighlight}</span>
              </h1>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 sm:p-12 space-y-6 animate-fade-in">
              <div className="flex items-center gap-4 mb-6">
                <User className="w-12 h-12 text-purple-400" />
                <h2 className="text-3xl font-bold text-white">{t.account.dashboard}</h2>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <p className="text-xl text-white/90 mb-6">{t.account.mobileNotFound}</p>

                <button
                  onClick={handleSignIn}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
                >
                  <LogIn className="w-5 h-5" />
                  {t.account.signIn}
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-white/70 text-center">{t.account.footerNote}</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
