"use client";

import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <span className="text-sm font-bold">D</span>
              </div>
              <span className="text-lg font-bold">DIASPORA NEWS RADIO</span>
            </div>
            <p className="text-sm opacity-80 mb-4">
              Premium audio content for the modern listener.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#shows"
                  className="hover:text-accent transition-colors"
                >
                  Shows
                </a>
              </li>
              <li>
                <a href="#news" className="hover:text-accent transition-colors">
                  News
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-accent transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-accent transition-colors"
                >
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a
                  href="mailto:hello@wave.radio"
                  className="hover:text-accent transition-colors"
                >
                  hello@diasporanews.radio
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a
                  href="tel:+1234567890"
                  className="hover:text-accent transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>New York, USA</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
              ].map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-accent text-primary-foreground flex items-center justify-center transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-80">
            <p>&copy; 2025 Diaspora News Radio. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
