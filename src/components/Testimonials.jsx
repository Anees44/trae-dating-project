// import "./Testimonials.css";

// function Testimonials() {
//   const testimonials = [
//     {
//       name: "Amina & Ahmed",
//       location: "London, UK",
//       image: "👫",
//       text: "We met on Mashallah six months ago and got married last month. The platform made it so easy to connect with like-minded people. Thank you!",
//       date: "Married: March 2024",
//     },
//     {
//       name: "Fatima & Yusuf",
//       location: "Toronto, Canada",
//       image: "👫",
//       text: "After trying other platforms, we found Mashallah to be the most respectful and genuine. The verification process gave us confidence.",
//       date: "Married: January 2024",
//     },
//     {
//       name: "Zainab & Omar",
//       location: "Dubai, UAE",
//       image: "👫",
//       text: "The moderation team is excellent. We felt safe and comfortable throughout our journey. Highly recommend!",
//       date: "Married: February 2024",
//     },
//   ];

//   return (
//     <section className="testimonials-section" id="testimonials">
//       <div className="testimonials-container">
//         <div className="testimonials-header">
//           <span className="subtitle">Success Stories</span>
//           <h2 className="title">
//             Real <span className="gradient-text">Love Stories</span>
//           </h2>
//           <p className="description">
//             Couples who found their perfect match through Rishta.com
//           </p>
//         </div>

//         <div className="testimonials-grid">
//           {testimonials.map((t, i) => (
//             <div key={i} className="testimonial-card">
//               <div className="avatar">{t.image}</div>
//               <p className="testimonial-text">"{t.text}"</p>
//               <div className="testimonial-footer">
//                 <p className="testimonial-name">{t.name}</p>
//                 <p className="testimonial-location">{t.location}</p>
//                 <p className="testimonial-date">{t.date}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Testimonials;
