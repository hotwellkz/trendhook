import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { PlanSelector } from './PlanSelector';
import { PaymentHistory } from './PaymentHistory';
import type { User, SubscriptionPlan } from '../../types/database';

interface SubscribersListProps {
  subscribers: User[];
  onPlanChange: (userId: string, plan: SubscriptionPlan) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (subscriber: User) => void;
}

export function SubscribersList({ 
  subscribers, 
  onPlanChange, 
  onDelete, 
  onEdit 
}: SubscribersListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-black/20">
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Email</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Имя</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">PayPal Email</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">План</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Статус</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Токены</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Платежи</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Действия</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {subscribers.map((subscriber) => (
            <tr key={subscriber.id} className="hover:bg-black/20">
              <td className="px-4 py-3 text-sm">{subscriber.email}</td>
              <td className="px-4 py-3 text-sm">{subscriber.displayName}</td>
              <td className="px-4 py-3 text-sm">{subscriber.paypalEmail || '-'}</td>
              <td className="px-4 py-3 text-sm">
                <PlanSelector
                  currentPlan={subscriber.subscription.plan}
                  onPlanChange={(plan) => onPlanChange(subscriber.id, plan)}
                />
              </td>
              <td className="px-4 py-3 text-sm">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  subscriber.subscription.status === 'active'
                    ? 'bg-green-500/10 text-green-500'
                    : subscriber.subscription.status === 'trial'
                    ? 'bg-blue-500/10 text-blue-500'
                    : 'bg-red-500/10 text-red-500'
                }`}>
                  {subscriber.subscription.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm">{subscriber.subscription.tokensLeft}</td>
              <td className="px-4 py-3 text-sm relative">
                <PaymentHistory 
                  payments={subscriber.payments}
                  totalPaid={subscriber.totalPaid}
                />
              </td>
              <td className="px-4 py-3 text-sm text-right">
                <button
                  onClick={() => onEdit(subscriber)}
                  className="text-gray-400 hover:text-white transition-colors p-1"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(subscriber.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1 ml-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
