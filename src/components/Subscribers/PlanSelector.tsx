import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { SubscriptionPlan } from '../../types/database';

interface PlanSelectorProps {
  currentPlan: SubscriptionPlan;
  onPlanChange: (plan: SubscriptionPlan) => void;
}

export function PlanSelector({ currentPlan, onPlanChange }: PlanSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const plans: SubscriptionPlan[] = ['free', 'content-creator', 'business', 'agency'];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm hover:text-[#AAFF00] transition-colors"
      >
        {currentPlan}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute mt-1 bg-black/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-800 py-1 z-10">
          {plans.map((plan) => (
            <button
              key={plan}
              onClick={() => {
                onPlanChange(plan);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-[#AAFF00]/10 transition-colors ${
                plan === currentPlan ? 'text-[#AAFF00]' : 'text-gray-400'
              }`}
            >
              {plan}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
