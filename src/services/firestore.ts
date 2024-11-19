// Add the new updateUserPlan function to the existing firestore.ts file
export const updateUserPlan = async (userId: string, plan: SubscriptionPlan): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      'subscription.plan': plan,
      'subscription.status': plan === 'free' ? 'expired' : 'active',
      'subscription.expiresAt': new Date(Date.now() + (plan === 'free' ? 0 : 30 * 24 * 60 * 60 * 1000)),
      'subscription.lastUpdated': new Date()
    });
  } catch (error) {
    console.error('Error updating user plan:', error);
    throw new Error('Failed to update user plan');
  }
};
