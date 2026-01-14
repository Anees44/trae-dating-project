// function Features() {
//   const features = [
//     {
//       icon: (
//         <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//         </svg>
//       ),
//       title: 'Active Moderation',
//       description:
//         'Our team actively moderates profiles and conversations to ensure a safe and respectful environment for all members.',
//       color: 'from-blue-500 to-blue-600',
//     },
//     {
//       icon: (
//         <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       ),
//       title: 'Quick Photo Validation',
//       description:
//         'Get your profile verified quickly with our fast photo validation process. Most profiles are approved within 24 hours.',
//       color: 'from-green-500 to-green-600',
//     },
//     {
//       icon: (
//         <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//         </svg>
//       ),
//       title: 'Large User Base',
//       description:
//         'Connect with thousands of verified Muslim singles from around the world looking for meaningful relationships.',
//       color: 'from-purple-500 to-purple-600',
//     },
//     {
//       icon: (
//         <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//         </svg>
//       ),
//       title: 'Privacy & Security',
//       description:
//         'Your privacy is our priority. We use advanced security measures to protect your personal information.',
//       color: 'from-red-500 to-red-600',
//     },
//     {
//       icon: (
//         <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//         </svg>
//       ),
//       title: 'Easy Communication',
//       description:
//         'Connect and communicate with potential matches through our secure messaging platform.',
//       color: 'from-indigo-500 to-indigo-600',
//     },
//     {
//       icon: (
//         <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//         </svg>
//       ),
//       title: 'Smart Matching',
//       description:
//         'Our advanced algorithm helps you find compatible matches based on your preferences and values.',
//       color: 'from-pink-500 to-pink-600',
//     },
//   ]

//   return (
//     <section className="py-24 bg-gradient-to-b from-white to-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-20">
//           <div className="inline-block mb-4">
//             <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
//               Why Choose Us
//             </span>
//           </div>
//           <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
//             Why Choose <span className="gradient-text">Mashallah</span>?
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             We provide a trusted platform designed specifically for Muslims
//             seeking meaningful relationships.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="group bg-white p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-primary-200 relative overflow-hidden"
//             >

//               <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

//               <div className={`relative mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} text-white transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
//                 {feature.icon}
//               </div>

//               <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">
//                 {feature.title}
//               </h3>
//               <p className="text-gray-600 leading-relaxed relative z-10">
//                 {feature.description}
//               </p>

//               <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Features




function Features() {
  const features = [
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Active Moderation",
      description:
        "Our team actively moderates profiles and conversations to ensure a safe and respectful environment for all members.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Quick Photo Validation",
      description:
        "Get your profile verified quickly with our fast photo validation process. Most profiles are approved within 24 hours.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Large User Base",
      description:
        "Connect with thousands of verified Muslim singles from around the world looking for meaningful relationships.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Privacy & Security",
      description:
        "Your privacy is our priority. We use advanced security measures to protect your personal information.",
      color: "from-red-500 to-red-600",
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: "Easy Communication",
      description:
        "Connect and communicate with potential matches through our secure messaging platform.",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Smart Matching",
      description:
        "Our advanced algorithm helps you find compatible matches based on your preferences and values.",
      color: "from-pink-500 to-pink-600",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-20">
          <span className="inline-block mb-4 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-sm font-semibold">
            Why Choose Us
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
            Why Choose <span className="gradient-text">Mashallah</span>?
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We provide a trusted platform designed specifically for Muslims
            seeking meaningful relationships.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              <div
                className={`relative mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} text-white transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
              >
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 relative z-10">
                {feature.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed relative z-10">
                {feature.description}
              </p>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
