import { useState } from 'react';
import { Accessibility } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AccessibilityWidget } from './AccessibilityWidget';

export function FloatingAccessibilityButton() {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsWidgetOpen(true)}
        className={cn(
          "fixed bottom-4 left-3 lg:left-4 z-50",
          "w-11 h-11 rounded-full",
          "bg-background border border-border shadow-lg",
          "flex items-center justify-center",
          "transition-all duration-200",
          "hover:scale-105 hover:shadow-xl hover:border-primary/50",
          "active:scale-95",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        )}
        aria-label="Barrierefreiheits-Einstellungen öffnen"
        title="Barrierefreiheit"
      >
        <Accessibility className="h-5 w-5 text-foreground" />
      </button>

      <AccessibilityWidget 
        isOpen={isWidgetOpen} 
        onClose={() => setIsWidgetOpen(false)} 
      />
    </>
  );
}
