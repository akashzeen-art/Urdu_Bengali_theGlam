import Navbar from "@/components/Navbar";
import VideoBackground from "@/components/VideoBackground";
import Footer from "@/components/Footer";
import { Heart, Users, Video, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen bg-yoga-cream">
      <VideoBackground />

      <div className="relative z-20">
        <Navbar />

        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-slide-up">
              <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
                {t.about.title} <span className="text-purple-500">{t.about.titleHighlight}</span>
              </h1>
              <p className="text-2xl text-white/90 font-semibold">{t.about.subtitle}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 sm:p-12 space-y-6 animate-fade-in">
              <p className="text-lg text-white/90 leading-relaxed">{t.about.p1}</p>
              <p className="text-lg text-white/90 leading-relaxed">{t.about.p2}</p>
              <p className="text-lg text-white/90 leading-relaxed">{t.about.p3}</p>

              <div className="bg-purple-500/20 rounded-xl p-6 my-8 border border-purple-400/30">
                <h2 className="text-2xl font-bold text-white mb-4">{t.about.missionTitle}</h2>
                <p className="text-lg text-white/90 leading-relaxed">{t.about.missionText}</p>
              </div>

              <p className="text-xl text-white font-semibold text-center pt-4">{t.about.cta}</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mt-12">
              {t.about.features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 text-center animate-bounce-in hover:bg-white/15 transition-all duration-300"
                  style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                >
                  <div className="text-purple-400 flex justify-center mb-3">
                    {index === 0 && <Video className="w-8 h-8" />}
                    {index === 1 && <Users className="w-8 h-8" />}
                    {index === 2 && <Clock className="w-8 h-8" />}
                    {index === 3 && <Heart className="w-8 h-8" />}
                  </div>
                  <h3 className="text-white font-bold mb-1">{feature.title}</h3>
                  <p className="text-white/70 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
