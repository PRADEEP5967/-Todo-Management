import React from 'react';

const Privacy: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          This sample policy explains how TaskFlow handles your information. Replace this with your real policy.
        </p>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>• We store the minimum information needed to operate your account.</p>
          <p>• We do not sell your personal information.</p>
          <p>• You can request deletion of your account data at any time.</p>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
