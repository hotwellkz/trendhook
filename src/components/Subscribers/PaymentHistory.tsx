import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Payment } from '../../types/database';

interface PaymentHistoryProps {
  payments?: Payment[];
  totalPaid?: number;
}

export function PaymentHistory({ payments, totalPaid }: PaymentHistoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!payments?.length) return null;

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm text-[#AAFF00] hover:underline flex items-center gap-1"
      >
        Всего оплачено: ${totalPaid?.toFixed(2) || '0.00'}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute mt-2 bg-black/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-800 p-4 z-20 min-w-[200px]">
          <h4 className="text-sm font-medium mb-2">История платежей:</h4>
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className={`text-xs ${
                  payment.status === 'refunded' ? 'text-red-400' : 'text-gray-400'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{new Date(payment.date).toLocaleDateString()}</span>
                  <span className={payment.status === 'refunded' ? 'text-red-400' : 'text-[#AAFF00]'}>
                    {payment.status === 'refunded' ? '-' : ''}${Math.abs(payment.amount).toFixed(2)}
                  </span>
                </div>
                <div className="text-gray-500">{payment.plan}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
