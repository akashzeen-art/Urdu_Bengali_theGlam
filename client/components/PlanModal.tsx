import { useLanguage } from "@/context/LanguageContext";

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (plan: string) => void;
  mobile: string;
  email: string;
  name: string;
  txnid: string;
}

export default function PlanModal({ isOpen, onClose, onSubmit, mobile, email, name, txnid }: PlanModalProps) {
  const { t } = useLanguage();
  const { monthly, monthlyOriginal, yearly, yearlyOriginal } = t.prices;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedPlan = (document.querySelector('input[name="plan"]:checked') as HTMLInputElement)?.value;
    if (selectedPlan) {
      onSubmit(selectedPlan);
    }
  };

  const formatPrice = (amount: number) => String(amount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 animate-fade-in">
        <form onSubmit={handleSubmit}>
          {/* Hidden display fields */}
          <p id="mobileDisplay" className="hidden">موبائل: {mobile}</p>
          <p id="txnidDisplay" className="hidden">ٹرانزیکشن آئی ڈی: {txnid}</p>
          <p id="nameDisplay" className="hidden">نام: {name}</p>
          <p id="emailDisplay" className="hidden">ای میل: {email}</p>

          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">{t.plan.title}</h3>

          {/* Monthly Plan */}
          <label className="block mb-4 cursor-pointer">
            <input
              className="hidden peer"
              type="radio"
              name="plan"
              value={String(monthly)}
            />
            <div className="border-2 border-gray-300 rounded-xl p-4 transition-all peer-checked:border-purple-600 peer-checked:bg-purple-50 hover:border-purple-400">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-800">{t.plan.monthly}</span>
                  <span className="text-2xl font-bold text-purple-600">{formatPrice(monthly)}</span>
                  <span className="text-sm text-gray-400 line-through">{formatPrice(monthlyOriginal)}</span>
                </div>
                <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {t.plan.discount50}
                </div>
              </div>
            </div>
          </label>

          {/* Yearly Plan */}
          <label className="block mb-6 cursor-pointer">
            <input
              className="hidden peer"
              type="radio"
              name="plan"
              value={String(yearly)}
              defaultChecked
            />
            <div className="border-2 border-gray-300 rounded-xl p-4 transition-all peer-checked:border-purple-600 peer-checked:bg-purple-50 hover:border-purple-400">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-800">{t.plan.yearly}</span>
                  <span className="text-2xl font-bold text-purple-600">{formatPrice(yearly)}</span>
                  <span className="text-sm text-gray-400 line-through">{formatPrice(yearlyOriginal)}</span>
                </div>
                <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {t.plan.discount55}
                </div>
              </div>
              <div className="text-center text-sm text-gray-600 mt-2 font-medium">
                {t.plan.unlimited}
              </div>
            </div>
          </label>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            {t.plan.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
