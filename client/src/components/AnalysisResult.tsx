import { motion } from "framer-motion";
import { type AnalysisReport } from "@shared/routes";
import { 
  TrendingUp, TrendingDown, Minus, 
  Target, AlertTriangle, Brain, 
  ShieldCheck, ArrowRight, Activity 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AnalysisResultProps {
  report: AnalysisReport;
}

export function AnalysisResult({ report }: AnalysisResultProps) {
  const isLong = report.entrySide === "Long";
  const isHighRisk = report.riskLevel === "High";

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-4xl mx-auto space-y-6"
    >
      {/* Disclaimer Banner */}
      <motion.div variants={item} className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
        <p className="text-sm text-orange-200/80 font-medium">
          ⚠️ This is AI-assisted analysis. No guarantees of profit. Trade at your own risk. Probability-based suggestions only.
        </p>
      </motion.div>

      {/* Main Signal Card */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group">
          <div className={`absolute top-0 right-0 p-32 blur-[80px] rounded-full opacity-20 -mr-16 -mt-16 transition-colors duration-500 ${isLong ? 'bg-green-500' : 'bg-red-500'}`} />
          
          <div className="relative z-10">
            <h3 className="text-muted-foreground font-medium mb-1">Signal Direction</h3>
            <div className="flex items-center gap-3 mb-6">
              {isLong ? (
                <TrendingUp className="w-8 h-8 text-green-500" />
              ) : (
                <TrendingDown className="w-8 h-8 text-red-500" />
              )}
              <span className={`text-4xl font-bold font-display ${isLong ? 'text-green-500' : 'text-red-500'}`}>
                {report.entrySide.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-black/20 border border-white/5">
                <span className="text-xs text-muted-foreground block mb-1">Risk Level</span>
                <Badge variant={isHighRisk ? "destructive" : "outline"} className={!isHighRisk ? "text-green-500 border-green-500/20 bg-green-500/10" : ""}>
                  {report.riskLevel}
                </Badge>
              </div>
              <div className="p-3 rounded-lg bg-black/20 border border-white/5">
                <span className="text-xs text-muted-foreground block mb-1">Probability</span>
                <span className="text-lg font-bold font-mono text-primary">{report.probability}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-center">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <span className="text-muted-foreground flex items-center gap-2">
                <Target className="w-4 h-4" /> Entry
              </span>
              <span className="font-mono font-bold text-lg">{report.entryPoint}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <span className="text-muted-foreground flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Stop Loss
              </span>
              <span className="font-mono font-bold text-lg text-red-400">{report.stopLoss}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center gap-2">
                <ArrowRight className="w-4 h-4" /> Take Profit
              </span>
              <span className="font-mono font-bold text-lg text-green-400">{report.takeProfit}</span>
            </div>
          </div>
          <div className="mt-6 p-3 rounded-lg bg-primary/5 border border-primary/20 text-center">
             <span className="text-xs text-primary/80 font-medium">Risk to Reward Ratio: {report.riskReward}</span>
          </div>
        </div>
      </motion.div>

      {/* Analysis Details */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-panel border-0 bg-card/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="w-4 h-4 text-accent" /> Trend Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-muted-foreground leading-relaxed">
               <span className="font-semibold text-foreground block mb-2">{report.trend}</span>
               {report.logic}
             </p>
          </CardContent>
        </Card>

        <Card className="glass-panel border-0 bg-card/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Brain className="w-4 h-4 text-accent" /> Psychology
            </CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-muted-foreground leading-relaxed italic">
               "{report.psychology}"
             </p>
          </CardContent>
        </Card>

        <Card className="glass-panel border-0 bg-card/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ArrowRight className="w-4 h-4 text-accent" /> Exit Strategy
            </CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-muted-foreground leading-relaxed">
               {report.exitStrategy}
             </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Fundamentals */}
      <motion.div variants={item}>
        <div className="glass-panel rounded-2xl p-6">
           <h4 className="font-semibold mb-3 flex items-center gap-2">
             Technical Confirmation & Fundamentals
           </h4>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div>
               <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Fundamentals</span>
               <p className="text-sm leading-relaxed text-gray-300">{report.fundamentals}</p>
             </div>
             <div>
               <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Confirmation</span>
               <div className="flex items-center gap-2">
                 <Badge variant={report.confirmation === "Yes" ? "default" : "secondary"}>
                   {report.confirmation === "Yes" ? "Confirmed" : "Unconfirmed"}
                 </Badge>
                 <span className="text-sm text-muted-foreground">
                   {report.confirmation === "Yes" ? "Setup meets all criteria" : "Weak technical structure"}
                 </span>
               </div>
             </div>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
