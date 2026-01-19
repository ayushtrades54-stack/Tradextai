import { useState } from "react";
import { useAnalyzeChart } from "@/hooks/use-analysis";
import { UploadZone } from "@/components/UploadZone";
import { AnalysisResult } from "@/components/AnalysisResult";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Home() {
  const { mutate, isPending, data, reset } = useAnalyzeChart();
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const handleAnalyze = (file: File) => {
    // Reset previous state if analyzing again
    if (hasAnalyzed) {
      reset();
      setHasAnalyzed(false);
    }
    
    mutate(file, {
      onSuccess: () => {
        setHasAnalyzed(true);
        // Scroll to result
        setTimeout(() => {
          document.getElementById('analysis-result')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-primary/20">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[60%] h-[40%] bg-blue-500/5 blur-[100px]" />
      </div>

      <main className="flex-grow relative z-10 px-4 pt-16 pb-24 max-w-7xl mx-auto w-full">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
            <Sparkles className="w-3 h-3 text-accent" />
            <span className="text-xs font-medium text-accent tracking-wide uppercase">Powered by AI Analysis</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-2 font-display">
            Tradext <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient">AI</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
            Trade with text. <br className="hidden md:block"/>
            <span className="text-white/80">Institutional-grade chart analysis in seconds.</span>
          </p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-24"
        >
          <UploadZone onAnalyze={handleAnalyze} isAnalyzing={isPending} />
        </motion.div>

        {/* Results Section */}
        {hasAnalyzed && data && (
          <div id="analysis-result">
            <AnalysisResult report={data.result} />
          </div>
        )}

        {/* Empty State / How it Works (Shown when no result) */}
        {!hasAnalyzed && !isPending && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto"
          >
            {[
              { step: "01", title: "Upload Chart", desc: "Take a screenshot of any chart pattern or setup." },
              { step: "02", title: "AI Analysis", desc: "Our model identifies trends, key levels, and risks." },
              { step: "03", title: "Get Report", desc: "Receive actionable insights with entry & exit points." }
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <span className="text-4xl font-bold text-white/5 mb-4 block font-display">{item.step}</span>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        )}

      </main>

      <Footer />
    </div>
  );
}
