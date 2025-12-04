"use client";

import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  YoutubeIcon,
  icons,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
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
                  href="mailto:Diasporanewsradio@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  Diasporanewsradio@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a
                  href="tel:+1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  +1 (682) 777-0791 or +1 214 699 7164
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FontAwesomeIcon icon={faWhatsapp} />
                <a
                  href="https://wa.me/18178742847"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  +1 (817) 874-2847
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex gap-3">
              {[
                {
                  icon: Facebook,
                  href: "https://www.facebook.com/share/1VraFQoBFN/?mibextid=wwXIfr",
                },
                { icon: Twitter, href: "https://x.com/diasporanradio?s=11" },
                {
                  icon: YoutubeIcon,
                  href: "https://www.youtube.com/@DIASPORANEWSRADIO",
                },
              ].map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-background hover:bg-accent text-foreground flex items-center justify-center transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
              <a
                href="https://www.tiktok.com/@diasporanr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-background hover:bg-accent text-foreground flex items-center justify-center transition-colors"
              >
                <TickTockIcon className="h-5 w-5 text-green-500" />
              </a>
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
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function TickTockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
      viewBox="0 0 455 512.098"
    >
      <path
        fill="#ffff"
        fillRule="nonzero"
        d="M321.331.011h-81.882v347.887c0 45.59-32.751 74.918-72.582 74.918-39.832 0-75.238-29.327-75.238-74.918 0-52.673 41.165-80.485 96.044-74.727v-88.153c-7.966-1.333-15.932-1.77-22.576-1.77C75.249 183.248 0 255.393 0 344.794c0 94.722 74.353 167.304 165.534 167.304 80.112 0 165.097-58.868 165.097-169.96V161.109c35.406 35.406 78.341 46.476 124.369 46.476V126.14C398.35 122.151 335.494 84.975 321.331 0v.011z"
      />
    </svg>
  );
}
