// import { Link } from 'react-router-dom'

// function Footer() {
//   return (
//     <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-black text-gray-300 relative overflow-hidden">
      
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute inset-0" style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v22H20v-2zm0 0v2H0v-2h20z'/%3E%3C/g%3E%3C/svg%3E")`,
//         }}></div>
//       </div>
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
       
//           <div className="col-span-1 md:col-span-2">
//             <h3 className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent mb-6">
//               Mashallah
//             </h3>
//             <p className="mb-6 text-gray-400 leading-relaxed max-w-md">
//               Connecting Muslims worldwide to find their perfect life partner
//               through a trusted and respectful platform.
//             </p>
//             <div className="flex space-x-4">
//               <a
//                 href="#"
//                 className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 hover:scale-110"
//                 aria-label="Facebook"
//               >
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//                 </svg>
//               </a>
//               <a
//                 href="#"
//                 className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 hover:scale-110"
//                 aria-label="Twitter"
//               >
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
//                 </svg>
//               </a>
//               <a
//                 href="#"
//                 className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 hover:scale-110"
//                 aria-label="Instagram"
//               >
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
//                 </svg>
//               </a>
//             </div>
//           </div>

          
//           <div>
//             <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
//             <ul className="space-y-3">
//               <li>
//                 <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
//                   <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
//                   <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
//                   How it Works
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
//                   <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
//                   Success Stories
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
//                   <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
//                   About Us
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="text-white font-bold mb-6 text-lg">Support</h4>
//             <ul className="space-y-3">
//               <li>
//                 <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
//                   <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
//                   Help Center
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
//                   <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
//                   Contact Us
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
//                   <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
//                   Privacy Policy
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
//                   <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
//                   Terms of Service
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-gray-800 mt-12 pt-8">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <p className="text-gray-400 text-sm mb-4 md:mb-0">
//               &copy; 2024 Mashallah. All rights reserved.
//             </p>
//             <div className="flex gap-6 text-sm text-gray-400">
//               <Link to="/" className="hover:text-primary-400 transition-colors">Privacy</Link>
//               <Link to="/" className="hover:text-primary-400 transition-colors">Terms</Link>
//               <Link to="/" className="hover:text-primary-400 transition-colors">Cookies</Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }

// export default Footer





import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gray-100 text-gray-600 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-900 dark:to-black dark:text-gray-300 transition-colors duration-300">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v22H20v-2zm0 0v2H0v-2h20z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent mb-6">
              Mashallah
            </h3>

            <p className="mb-6 text-gray-500 dark:text-gray-400 leading-relaxed max-w-md">
              Connecting Muslims worldwide to find their perfect life partner
              through a trusted and respectful platform.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4">
              {["Facebook", "Twitter", "Instagram"].map((label, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 hover:scale-110"
                >
                  <span className="text-gray-600 dark:text-gray-300">★</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-6 text-lg">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["Home", "How it Works", "Success Stories", "About Us"].map(
                (item, i) => (
                  <li key={i}>
                    <Link
                      to="/"
                      className="text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition flex items-center group"
                    >
                      <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-6 text-lg">
              Support
            </h4>
            <ul className="space-y-3">
              {["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"].map(
                (item, i) => (
                  <li key={i}>
                    <Link
                      to="/"
                      className="text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition flex items-center group"
                    >
                      <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
              &copy; 2024 Mashallah. All rights reserved.
            </p>

            <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
              <Link to="/" className="hover:text-primary-500 transition">
                Privacy
              </Link>
              <Link to="/" className="hover:text-primary-500 transition">
                Terms
              </Link>
              <Link to="/" className="hover:text-primary-500 transition">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
