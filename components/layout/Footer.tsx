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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Camp & Explorer</h3>
            <p className="text-xs text-neutral-400 leading-relaxed mb-3">
              Culture & Nature | Kigali Cultural Experience. Community-led eco-tourism, agro-experiences, and outdoor adventures at Mount Jali.
            </p>
            <div className="text-xs text-neutral-400 space-y-1">
              <p className="text-white font-medium">Mount Jali, Jali–Gasabo</p>
              <p>Kigali, Rwanda</p>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Our Experiences</h3>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><Link href="/tours/mount-jali-hiking" className="hover:text-white transition-colors">Mount Jali Guided Hiking</Link></li>
              <li><Link href="/tours/traditional-cuisine-experience" className="hover:text-white transition-colors">Traditional Rwandan Cuisine</Link></li>
              <li><Link href="/tours/banana-brewing-experience" className="hover:text-white transition-colors">Banana Beer Brewing (Urwagwa)</Link></li>
              <li><Link href="/tours/coffee-crop-to-cup" className="hover:text-white transition-colors">Coffee Crop-to-Cup Experience</Link></li>
              <li><Link href="/tours/mount-jali-camping" className="hover:text-white transition-colors">Overnight Nature Camping</Link></li>
              <li><Link href="/tours/archery-experience" className="hover:text-white transition-colors">Target Archery & Biking</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Contact & Inquiries</h3>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <span className="text-neutral-500 block text-[11px]">WhatsApp & Phone</span>
                <a href="tel:+250788621474" className="hover:text-white transition-colors font-mono">+250 788 621 474</a>
              </li>
              <li>
                <span className="text-neutral-500 block text-[11px]">Alternative Line</span>
                <a href="tel:+250728421419" className="hover:text-white transition-colors font-mono">+250 728 421 419</a>
              </li>
              <li>
                <span className="text-neutral-500 block text-[11px]">Email Inquiries</span>
                <a href="mailto:campexp18@gmail.com" className="hover:text-white transition-colors">campexp18@gmail.com</a>
              </li>
              <li>
                <span className="text-neutral-500 block text-[11px]">Official Website</span>
                <a href="https://www.campandexplorer.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">www.campandexplorer.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Hotels & Partnerships</h3>
            <p className="text-xs text-neutral-400 leading-relaxed mb-3">
              We welcome hotel partnerships, tour operators, school field trips, and corporate retreat inquiries.
            </p>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><Link href="/" className="hover:text-white transition-colors">Hotel Package Combinations</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Team Building Retreats</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Booking & Cancellation Terms</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Community Impact Initiatives</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-12 pt-8 border-t border-neutral-800 text-xs text-neutral-500 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p>© 2026 Camp & Explorer. All rights reserved. Jali–Gasabo, Kigali, Rwanda.</p>
          <p>Culture & Nature Experience Platform • Built with Next.js & React</p>
        </div>
      </div>
    </footer>
  );
}
