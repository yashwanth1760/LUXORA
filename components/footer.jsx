import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-[#fffdf8] py-12 mt-10 text-[#4b4b4b]">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Branding */}
        <div>
          <h2 className="text-xl font-semibold text-[#bfa14b] mb-2">
            Luxora AI
          </h2>
          <p className="text-sm">
            Smart financial planning powered by AI. Helping you grow and protect
            your wealth.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-md font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="/about" className="hover:underline hover:text-[#bfa14b]">
                About Us
              </a>
            </li>
            <li>
              <a
                href="/features"
                className="hover:underline hover:text-[#bfa14b]"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="/pricing"
                className="hover:underline hover:text-[#bfa14b]"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:underline hover:text-[#bfa14b]"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact / Newsletter */}
        <div>
          <h3 className="text-md font-semibold mb-2">Stay Updated</h3>
          <p className="text-sm mb-3">
            Subscribe to our newsletter for insights and updates.
          </p>
          <form className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-3 py-2 rounded border border-gray-300 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#bfa14b]"
            />
            <button
              type="submit"
              className="bg-[#bfa14b] text-white px-4 py-2 rounded hover:bg-[#a3883b]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 text-center text-sm text-gray-600 border-t border-gray-200 pt-6">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-[#bfa14b] font-medium">Luxora AI</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};
