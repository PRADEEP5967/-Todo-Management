import React from 'react';

const Terms: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Terms & Conditions</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          These sample terms describe how you may use TaskFlow. Replace this content with your real terms.
        </p>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>1. Use the app responsibly and in compliance with local laws.</p>
          <p>2. We do not guarantee uptime or data retention for demo environments.</p>
          <p>3. You are responsible for safeguarding your account credentials.</p>
        </div>
      </div>
    </section>
  );
};

export default Terms;
