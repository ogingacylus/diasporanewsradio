import {
  Megaphone,
  TrendingUp,
  Users,
  Target,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 mt-32">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-full mb-6">
            <Megaphone className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Amplify Your Brand with{" "}
            <span className="text-accent">WAVE Radio</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Reach thousands of engaged listeners daily. Our diverse programming
            offers the perfect platform to connect with your target audience.
          </p>
          <Link
            href="/advertisements/form"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-accent-foreground bg-accent rounded-lg hover:opacity-90 transition-opacity"
          >
            Start Advertising
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-card border-y border-border py-16 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-accent mb-2">20k+</div>
              <div className="text-muted-foreground">Weekly Listeners</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">85%</div>
              <div className="text-muted-foreground">Retention Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">120+</div>
              <div className="text-muted-foreground">Partner Brands</div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-3xl font-bold text-foreground text-center mb-12">
          Advertising Solutions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <RadioIcon className="w-8 h-8 text-accent" />,
              title: "On-Air Commercials",
              description:
                "Premium spots during peak listening hours to maximize your reach.",
            },
            {
              icon: <Users className="w-8 h-8 text-accent" />,
              title: "Show Sponsorships",
              description:
                "Align your brand with our most popular shows and personalities.",
            },
            {
              icon: <Target className="w-8 h-8 text-accent" />,
              title: "Digital Integration",
              description:
                "Cross-platform campaigns including website, app, and social media.",
            },
            {
              icon: <TrendingUp className="w-8 h-8 text-accent" />,
              title: "Event Partnerships",
              description:
                "Direct engagement opportunities at our live events and concerts.",
            },
            {
              icon: <Megaphone className="w-8 h-8 text-accent" />,
              title: "Live Reads",
              description:
                "Authentic endorsements from our trusted radio hosts.",
            },
            {
              icon: <CheckCircle className="w-8 h-8 text-accent" />,
              title: "Custom Campaigns",
              description:
                "Tailored strategies designed to meet your specific marketing goals.",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-xl border border-border hover:border-accent/50 transition-colors"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function RadioIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
      <circle cx="12" cy="12" r="2" />
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
    </svg>
  );
}
