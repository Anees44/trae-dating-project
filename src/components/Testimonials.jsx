// function Testimonials() {
//   const testimonials = [
//     {
//       name: 'Amina & Ahmed',
//       location: 'London, UK',
//       image: '👫',
//       text: 'We met on Mashallah six months ago and got married last month. The platform made it so easy to connect with like-minded people. Thank you!',
//       date: 'Married: March 2024',
//     },
//     {
//       name: 'Fatima & Yusuf',
//       location: 'Toronto, Canada',
//       image: '👫',
//       text: 'After trying other platforms, we found Mashallah to be the most respectful and genuine. The verification process gave us confidence.',
//       date: 'Married: January 2024',
//     },
//     {
//       name: 'Zainab & Omar',
//       location: 'Dubai, UAE',
//       image: '👫',
//       text: 'The moderation team is excellent. We felt safe and comfortable throughout our journey. Highly recommend!',
//       date: 'Married: February 2024',
//     },
//   ]

//   return (
//     <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">

//       <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl"></div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="text-center mb-20">
//           <div className="inline-block mb-4">
//             <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
//               Success Stories
//             </span>
//           </div>
//           <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
//             Real <span className="gradient-text">Love Stories</span>
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             Real couples who found their perfect match through Mashallah
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {testimonials.map((testimonial, index) => (
//             <div
//               key={index}
//               className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden"
//             >

//               <div className="absolute top-4 right-4 text-primary-200 text-6xl font-serif">"</div>

//               <div className="flex justify-center mb-6">
//                 <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-4xl transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
//                   {testimonial.image}
//                 </div>
//               </div>

//               <p className="text-gray-700 mb-6 italic text-center leading-relaxed relative z-10 text-lg">
//                 {testimonial.text}
//               </p>

//               <div className="flex justify-center gap-1 mb-4">
//                 {[...Array(5)].map((_, i) => (
//                   <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
//                     <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
//                   </svg>
//                 ))}
//               </div>

//               <div className="text-center border-t pt-4">
//                 <p className="font-bold text-gray-900 text-lg">{testimonial.name}</p>
//                 <p className="text-sm text-gray-500 mt-1">{testimonial.location}</p>
//                 <p className="text-xs text-primary-600 font-semibold mt-2">{testimonial.date}</p>
//               </div>

//               <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Testimonials




function Testimonials() {
  const testimonials = [
    {
      name: "Amina & Ahmed",
      location: "London, UK",
      image: "👫",
      text: "We met on Mashallah six months ago and got married last month. The platform made it so easy to connect with like-minded people. Thank you!",
      date: "Married: March 2024",
    },
    {
      name: "Fatima & Yusuf",
      location: "Toronto, Canada",
      image: "👫",
      text: "After trying other platforms, we found Mashallah to be the most respectful and genuine. The verification process gave us confidence.",
      date: "Married: January 2024",
    },
    {
      name: "Zainab & Omar",
      location: "Dubai, UAE",
      image: "👫",
      text: "The moderation team is excellent. We felt safe and comfortable throughout our journey. Highly recommend!",
      date: "Married: February 2024",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black relative overflow-hidden transition-colors duration-300">

      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 dark:bg-primary-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-300/20 dark:bg-primary-600/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Heading */}
        <div className="text-center mb-20">
          <span className="inline-block mb-4 px-4 py-2 bg-primary-100 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400 rounded-full text-sm font-semibold">
            Success Stories
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            Real <span className="gradient-text">Love Stories</span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Real couples who found their perfect match through Mashallah
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl dark:shadow-black/40 transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-800 relative overflow-hidden"
            >

              {/* Quote */}
              <div className="absolute top-4 right-4 text-primary-200 dark:text-primary-400/20 text-6xl font-serif">
                "
              </div>

              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-4xl transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {testimonial.image}
                </div>
              </div>

              {/* Text */}
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic text-center leading-relaxed text-lg relative z-10">
                {testimonial.text}
              </p>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Footer */}
              <div className="text-center border-t border-gray-200 dark:border-gray-800 pt-4">
                <p className="font-bold text-gray-900 dark:text-white text-lg">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {testimonial.location}
                </p>
                <p className="text-xs text-primary-600 dark:text-primary-400 font-semibold mt-2">
                  {testimonial.date}
                </p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
