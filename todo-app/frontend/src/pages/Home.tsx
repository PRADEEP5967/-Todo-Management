import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Plan less. Do more.
          </motion.h1>
          <motion.p
            className="mt-6 text-base sm:text-lg text-gray-700 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            TaskFlow keeps your tasks organized and your goals on track with a clean, focused experience.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Get Started
            </Link>
            <Link
              to="/signin"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-md text-indigo-600 border border-indigo-600 bg-transparent hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-all duration-200"
            >
              Sign In
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {[
            { title: 'Fast planning', desc: 'Create tasks and lists in seconds with a delightful UI.', icon: (
              <svg className="h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"/></svg>
            )},
            { title: 'Stay focused', desc: 'Dark mode and subtle animations help you stay in flow.', icon: (
              <svg className="h-6 w-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m8-9h1M3 12H2m15.364-6.364l.707.707M5.929 18.071l-.707.707M18.364 18.364l.707-.707M5.636 5.636l-.707-.707"/></svg>
            )},
            { title: 'Work anywhere', desc: 'Responsive design looks great on desktop and mobile.', icon: (
              <svg className="h-6 w-6 text-pink-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 21l3-1.5L15 21l-.75-4M3 13s2-2 6-2 6 2 6 2 2-2 6-2"/></svg>
            )},
          ].map((f, i) => (
            <motion.div
              key={i}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              <div className="h-11 w-11 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 sm:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">A clean, focused workspace</h2>
            <p className="mt-3 text-gray-700 dark:text-gray-300">
              Keep priorities front and center. Organize by lists, set deadlines, and track progress with ease.
            </p>
            <div className="mt-6 flex gap-3">
              <Link to="/signup" className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition">
                Create free account
              </Link>
              <Link to="/signin" className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-md text-indigo-600 border border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition">
                I already have an account
              </Link>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 shadow-xl p-4 sm:p-6">
              <div className="aspect-[16/10] rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <span className="text-sm">(Preview your tasks here)</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-16 sm:mt-24"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 sm:p-10 text-center shadow-lg">
            <h3 className="text-2xl font-bold">Ready to get started?</h3>
            <p className="mt-2 text-indigo-100">Join TaskFlow for free and start organizing your day in minutes.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/signup" className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-md bg-white text-indigo-700 hover:bg-indigo-50 transition">
                Create account
              </Link>
              <Link to="/signin" className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-md border border-white/80 hover:bg-white/10 transition">
                Sign in
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
