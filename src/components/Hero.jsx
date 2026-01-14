// import { Link } from 'react-router-dom'
// import { useEffect, useRef } from 'react'
// import intro from "../../public/intro.mp4"
// function Hero() {
//   const videoRef = useRef(null)

//   useEffect(() => {

//     if (videoRef.current) {
//       videoRef.current.play().catch(() => {

//       })
//     }
//   }, [])

//   return (
//     <section className="relative h-screen flex items-center justify-center overflow-hidden">

//       <video
//         ref={videoRef}
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute top-0 left-0 w-full h-full object-cover z-0 scale-110"
//       >
//         <source src={intro} type="video/mp4" />
//         <source src={intro} type="video/webm" />
//       </video>

//       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-900/90 via-primary-700/85 to-primary-600/90 z-10"></div>

//       <div className="absolute inset-0 z-10">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl animate-float"></div>
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
//       </div>

//       <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-white">
//         <div className="text-center animate-fade-in-up">
//           <div className="inline-block mb-6">
//             <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold border border-white/30">
//               Trusted by 100,000+ Members Worldwide
//             </span>
//           </div>
//           <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
//             <span className="block">Find Your</span>
//             <span className="block bg-gradient-to-r from-white via-primary-100 to-white bg-clip-text text-transparent">
//               Perfect Match
//             </span>
//           </h1>
//           <p className="text-xl md:text-2xl mb-10 text-primary-100 max-w-3xl mx-auto leading-relaxed">
//             Join thousands of Muslims finding their life partners through our
//             trusted matrimony platform. Verified profiles, active moderation,
//             and a respectful community.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-5 justify-center mb-8">
//             <Link
//               to="/register"
//               className="group bg-white text-primary-600 px-10 py-4 rounded-xl text-lg font-bold hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-primary-500/50 transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden"
//             >
//               <span className="relative z-10">Get Started Free</span>
//               <span className="absolute inset-0 bg-gradient-to-r from-primary-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
//             </Link>
//             <Link
//               to="/login"
//               className="group bg-transparent border-2 border-white/80 text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm transform hover:-translate-y-1"
//             >
//               Log In
//             </Link>
//           </div>
//           <div className="flex items-center justify-center gap-8 text-sm text-primary-200">
//             <div className="flex items-center gap-2">
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//               </svg>
//               <span>Verified Profiles</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//               </svg>
//               <span>Secure & Private</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//               </svg>
//               <span>24/7 Support</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
//         <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//         </svg>
//       </div>
//     </section>
//   )
// }

// export default Hero




import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import intro from "../assests/intro.mp4";

function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">

      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 scale-110"
      >
        <source src={intro} type="video/mp4" />
      </video>

      {/* Overlay (light vs dark mode) */}
      <div className="absolute inset-0 z-10 
        bg-gradient-to-br 
        from-primary-900/90 via-primary-700/85 to-primary-600/90
        dark:from-black/90 dark:via-gray-900/90 dark:to-black/95
        transition-colors duration-300">
      </div>

      {/* Floating blobs */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/20 dark:bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/20 dark:bg-primary-600/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-white">
        <div className="text-center animate-fade-in-up">

          <span className="inline-block mb-6 px-4 py-2 
            bg-white/20 dark:bg-white/10 
            backdrop-blur-md rounded-full text-sm font-semibold 
            border border-white/30 dark:border-white/10">
            Trusted by 100,000+ Members Worldwide
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            <span className="block">Find Your</span>
            <span className="block bg-gradient-to-r from-white via-primary-100 to-white bg-clip-text text-transparent">
              Perfect Match
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-10 
            text-primary-100 dark:text-gray-300 
            max-w-3xl mx-auto leading-relaxed">
            Join thousands of Muslims finding their life partners through our
            trusted matrimony platform. Verified profiles, active moderation,
            and a respectful community.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-8">
            <Link
              to="/register"
              className="group bg-white text-primary-600 px-10 py-4 rounded-xl text-lg font-bold 
                hover:bg-gray-50 transition-all duration-300 shadow-2xl 
                hover:shadow-primary-500/50 transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden"
            >
              <span className="relative z-10">Get Started Free</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>

            <Link
              to="/login"
              className="group bg-transparent border-2 border-white/80 text-white px-10 py-4 rounded-xl text-lg font-bold 
                hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm transform hover:-translate-y-1"
            >
              Log In
            </Link>
          </div>

          {/* Features */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-primary-200 dark:text-gray-400">
            {["Verified Profiles", "Secure & Private", "24/7 Support"].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

export default Hero;
