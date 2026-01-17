// import "./Features.css";

// function Features() {
//   const features = [
//     {
//       icon: (
//         <svg viewBox="0 0 24 24">
//           <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//         </svg>
//       ),
//       title: "Active Moderation",
//       description:
//         "Our team actively moderates profiles and conversations to ensure a safe and respectful environment for all members.",
//     },
//     {
//       icon: (
//         <svg viewBox="0 0 24 24">
//           <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       ),
//       title: "Quick Photo Validation",
//       description:
//         "Get your profile verified quickly with our fast photo validation process. Most profiles are approved within 24 hours.",
//     },
//     {
//       icon: (
//         <svg viewBox="0 0 24 24">
//           <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
//         </svg>
//       ),
//       title: "Large User Base",
//       description:
//         "Connect with thousands of verified Muslim singles from around the world looking for meaningful relationships.",
//     },
//     {
//       icon: (
//         <svg viewBox="0 0 24 24">
//           <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//         </svg>
//       ),
//       title: "Privacy & Security",
//       description:
//         "Your privacy is our priority. We use advanced security measures to protect your personal information.",
//     },
//     {
//       icon: (
//         <svg viewBox="0 0 24 24">
//           <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//         </svg>
//       ),
//       title: "Easy Communication",
//       description:
//         "Connect and communicate with potential matches through our secure messaging platform.",
//     },
//     {
//       icon: (
//         <svg viewBox="0 0 24 24">
//           <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//         </svg>
//       ),
//       title: "Smart Matching",
//       description:
//         "Our advanced algorithm helps you find compatible matches based on your preferences and values.",
//     },
//   ];

//   return (
//     <section className="features">
//       <div className="features-container">
//         <div className="features-header">
//           <span>Why Choose Us</span>
//           <h2>
//             Why Choose <span>Mashallah</span>?
//           </h2>
//           <p>
//             We provide a trusted platform designed specifically for Muslims
//             seeking meaningful relationships.
//           </p>
//         </div>

//         <div className="features-grid">
//           {features.map((feature, index) => (
//             <div className="feature-card" key={index}>
//               <div className="feature-icon">{feature.icon}</div>
//               <h3>{feature.title}</h3>
//               <p>{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Features;




import "./Features.css";

function Features() {
  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Active Moderation",
      description:
        "Our team actively moderates profiles and conversations to ensure a safe and respectful environment for all members.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Quick Photo Validation",
      description:
        "Get your profile verified quickly with our fast photo validation process. Most profiles are approved within 24 hours.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Large User Base",
      description:
        "Connect with thousands of verified Muslim singles from around the world looking for meaningful relationships.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Privacy & Security",
      description:
        "Your privacy is our priority. We use advanced security measures to protect your personal information.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: "Easy Communication",
      description:
        "Connect and communicate with potential matches through our secure messaging platform.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Smart Matching",
      description:
        "Our advanced algorithm helps you find compatible matches based on your preferences and values.",
    },
  ];

  return (
    <section className="features" id="features">
      <div className="features-container">
        <div className="features-header">
          <span>Why Choose Us</span>
          <h2>
            Why Choose <span>Rishta.com</span>?
          </h2>
          <p>
            We provide a trusted platform designed specifically for Muslims
            seeking meaningful relationships.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;

