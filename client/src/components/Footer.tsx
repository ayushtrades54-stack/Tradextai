import { Mail, Phone, MessageSquare } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-12 border-t border-white/5 bg-background/50 backdrop-blur-sm relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Tradext AI
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Advanced AI-powered chart analysis for retail traders. 
              Get institutional-grade insights in seconds.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                <Mail className="w-4 h-4" />
                <span>ayushtrades54@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                <Phone className="w-4 h-4" />
                <span>+91 9477293867</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Feedback</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Help us improve our AI model with your feedback.
            </p>
            <button className="flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors">
              <MessageSquare className="w-4 h-4" />
              Send Feedback
            </button>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Tradext AI. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/50">
            Disclaimer: Trading involves risk. AI analysis is probabilistic.
          </p>
        </div>
      </div>
    </footer>
  );
}
