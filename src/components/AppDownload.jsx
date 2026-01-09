function AppDownload() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold border border-white/30">
              📱 Mobile App Available
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Download Our Mobile App
          </h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
            Stay connected and find your match on the go with our mobile
            application. Available on iOS and Android.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a
            href="#"
            className="group bg-black/90 hover:bg-black backdrop-blur-sm px-8 py-5 rounded-2xl flex items-center gap-4 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 border border-white/10"
          >
            <div className="text-5xl transform group-hover:scale-110 transition-transform duration-300">📱</div>
            <div className="text-left">
              <div className="text-xs text-gray-400 uppercase tracking-wider">Download on the</div>
              <div className="text-xl font-bold">App Store</div>
            </div>
            <svg className="w-6 h-6 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>

          <a
            href="#"
            className="group bg-black/90 hover:bg-black backdrop-blur-sm px-8 py-5 rounded-2xl flex items-center gap-4 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 border border-white/10"
          >
            <div className="text-5xl transform group-hover:scale-110 transition-transform duration-300">📱</div>
            <div className="text-left">
              <div className="text-xs text-gray-400 uppercase tracking-wider">Get it on</div>
              <div className="text-xl font-bold">Google Play</div>
            </div>
            <svg className="w-6 h-6 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        
        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold mb-2">Fast & Responsive</h3>
            <p className="text-sm text-primary-100">Lightning-fast performance</p>
          </div>
          <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <div className="text-3xl mb-3">🔔</div>
            <h3 className="font-semibold mb-2">Push Notifications</h3>
            <p className="text-sm text-primary-100">Never miss a message</p>
          </div>
          <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <div className="text-3xl mb-3">📸</div>
            <h3 className="font-semibold mb-2">Easy Photo Upload</h3>
            <p className="text-sm text-primary-100">Share moments instantly</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AppDownload

