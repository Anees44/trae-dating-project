// import { useState } from 'react'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'

// function Contact() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: '',
//   })

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     console.log('Contact form:', formData)
//   }

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     })
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 flex flex-col">
//       {/* <Navbar /> */}
//       <div className="flex-grow py-20 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-4xl mx-auto">
//           <div className="text-center mb-12">
//             <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
//               Contact Us
//             </h1>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
//             </p>
//           </div>

//           <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100">
//             <form className="space-y-6" onSubmit={handleSubmit}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
//                     Your Name
//                   </label>
//                   <input
//                     id="name"
//                     name="name"
//                     type="text"
//                     required
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
//                     placeholder="John Doe"
//                     value={formData.name}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
//                     Email Address
//                   </label>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     required
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
//                     placeholder="you@example.com"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
//                   Subject
//                 </label>
//                 <input
//                   id="subject"
//                   name="subject"
//                   type="text"
//                   required
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
//                   placeholder="How can we help?"
//                   value={formData.subject}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
//                   Message
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   rows={6}
//                   required
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none"
//                   placeholder="Your message here..."
//                   value={formData.message}
//                   onChange={handleChange}
//                 ></textarea>
//               </div>
//               <div>
//                 <button
//                   type="submit"
//                   className="w-full py-3.5 px-4 border border-transparent text-base font-bold rounded-xl text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
//                 >
//                   Send Message
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   )
// }

// export default Contact





import { useState } from 'react'
import Footer from '../components/Footer'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Contact form:', formData)
    // You can add API/email sending logic here
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col">

      <div className="flex-grow py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">

          {/* Page Heading */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Contact Us
            </h1>
            <p className="text-xl max-w-2xl mx-auto leading-relaxed text-gray-600 dark:text-gray-300">
              Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
            <form className="space-y-6" onSubmit={handleSubmit}>

              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="Your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Send Message
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Contact
