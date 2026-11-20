import React from "react";
import Link from "next/link";
import { ShieldCheck, Award, Clock, HelpCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 mt-auto border-t border-neutral-800">
      {/* Trust & Guarantee Badges Banner */}
      <div className="border-b border-neutral-800 bg-neutral-950/40 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-xl bg-brand-primary/10 text-brand-primary flex-shrink-0">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-xs sm:text-sm">Free Cancellation</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Up to 24 hours in advance for a full refund on most tours.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-xl bg-brand-primary/10 text-brand-primary flex-shrink-0">
              <Award className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-xs sm:text-sm">300,000+ Experiences</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Curated tours, activities, and must-see attractions worldwide.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-xl bg-brand-primary/10 text-brand-primary flex-shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-xs sm:text-sm">Lowest Price Guarantee</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Find it cheaper elsewhere? We will happily refund the difference.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-xl bg-brand-primary/10 text-brand-primary flex-shrink-0">
              <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-xs sm:text-sm">24/7 Global Support</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Our customer service team is always here to assist your travels.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4">About Viator</h3>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><Link href="/" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Press & Media</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Investor Relations</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Viator Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Customer Care</h3>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><Link href="/" className="hover:text-white transition-colors">Help Center & FAQ</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Cancellation Options</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Site Map</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Top Destinations</h3>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><Link href="/" className="hover:text-white transition-colors">Paris Tours</Link></li>
              <li><Link href="/tours/versailles-palace-tour" className="hover:text-white transition-colors">Versailles Palace Excursions</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Rome & Vatican City</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">London Sightseeing</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">New York City Tours</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Partner With Us</h3>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><Link href="/" className="hover:text-white transition-colors">Supplier Sign-Up</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Travel Agents (TAP)</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Affiliate Program</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Influencer Partnerships</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-12 pt-8 border-t border-neutral-800 text-xs text-neutral-500 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p>© 2026 Viator, Inc. A TripAdvisor Company. All rights reserved.</p>
          <p>Preserving authentic Viator UI, design system tokens, and responsive layout standards.</p>
        </div>
      </div>
    </footer>
  );
}
