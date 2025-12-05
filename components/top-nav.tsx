import {
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function TopNav() {
  const pathname: string = usePathname();
  return (
    <div className="  bg-black text-primary-foreground py-3  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={` text-lg font-bold text-white ${
            pathname.startsWith("/admin") ? "" : "hidden"
          }`}
        >
          Diaspora News Radio
        </div>
        <div
          className={`flex flex-row sm:flex-row justify-between items-center gap-4 ${
            pathname.startsWith("/admin") ? "hidden" : ""
          }`}
        >
          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
            <Link
              href="mailto:Diasporanewsradio@gmail.com"
              className="hidden md:flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Mail size={16} />
              <span>Diasporanewsradio@gmail.com</span>
            </Link>
            <div className="hidden sm:block w-px h-4 bg-primary-foreground/30" />
            <Link
              href="tel:+16827770791"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Phone size={16} />
              <span> +1 (682) 777-0791 </span>{" "}
              <span className="hidden md:block">or +1 214 699 7164</span>
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-sm hidden md:inline">Follow us:</span>
            <div className="flex items-center gap-3">
              <Link
                href="https://www.facebook.com/share/1VraFQoBFN/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Facebook size={18} />
              </Link>
              <Link
                href="https://x.com/diasporanradio?s=11"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Twitter size={18} />
              </Link>

              <Link
                href="https://www.youtube.com/@DIASPORANEWSRADIO"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Youtube size={18} />
              </Link>

              <Link
                href="https://www.tiktok.com/@diasporanr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <TickTockIcon className="h-4 w-4 " />
              </Link>
              <Link
                href="mailto:Diasporanewsradio@gmail.com"
                className=" md:hidden items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Mail size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
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
        fill="#fff"
        fillRule="nonzero"
        d="M321.331.011h-81.882v347.887c0 45.59-32.751 74.918-72.582 74.918-39.832 0-75.238-29.327-75.238-74.918 0-52.673 41.165-80.485 96.044-74.727v-88.153c-7.966-1.333-15.932-1.77-22.576-1.77C75.249 183.248 0 255.393 0 344.794c0 94.722 74.353 167.304 165.534 167.304 80.112 0 165.097-58.868 165.097-169.96V161.109c35.406 35.406 78.341 46.476 124.369 46.476V126.14C398.35 122.151 335.494 84.975 321.331 0v.011z"
      />
    </svg>
  );
}
