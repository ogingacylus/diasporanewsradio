"use client";

import { useState, useEffect } from "react";
import { ExternalLink, MapPin, Phone, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function Advertisements({
  filteredPremium,
  filteredLocal,
}: {
  filteredPremium: any;
  filteredLocal: any;
}) {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Our Partners & Advertisers
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Check out our partners.
          </p>
        </div>

        {/* Premium Ads Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-accent mb-8 flex items-center gap-2">
            <span className="w-2 h-8 bg-accent rounded-full"></span>
            Featured Partners
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPremium === 0 ? (
              <p className="flex items-center justify-center  text-md font-bold">
                No premium ads yet{" "}
              </p>
            ) : (
              <>
                {" "}
                {filteredPremium.map((ad: any) => (
                  <div
                    key={ad.id}
                    className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300 shadow-lg hover:shadow-accent/10"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={ad.image_url || "/placeholder.svg"}
                        alt={ad.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
                        Featured
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-sm text-accent font-medium mb-1 block">
                            {ad.category}
                          </span>
                          <h3 className="text-2xl font-bold text-foreground">
                            {ad.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-6">
                        {ad.description}
                      </p>

                      <div className="space-y-3 border-t border-border pt-4">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 text-accent" />
                          {ad.location}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Phone className="w-4 h-4 text-accent" />
                          {ad.phone}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Globe className="w-4 h-4 text-accent" />
                          <a
                            href={ad.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-accent transition-colors"
                          >
                            Visit Website
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Standard Ads Grid */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Local Directory
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLocal === 0 ? (
              <p className="flex items-center justify-center text-md font-bold">
                No ads yet in local directory
              </p>
            ) : (
              <>
                {" "}
                {filteredLocal.map((ad: any) => (
                  <div
                    key={ad.id}
                    className="bg-card rounded-xl border border-border overflow-hidden hover:border-accent/50 transition-colors"
                  >
                    <div className="aspect-[3/2] relative">
                      <Image
                        src={ad.image_url || "/placeholder.svg"}
                        alt={ad.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-medium text-accent mb-2 block">
                        {ad.category}
                      </span>
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {ad.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {ad.description}
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {ad.location}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          {ad.phone}
                        </div>
                      </div>

                      <div className="flex  items-center gap-2 text-xs text-muted-foreground pt-4 ">
                        <Globe className="w-4 h-4" />
                        <a
                          href={ad.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent transition-colors"
                        >
                          Visit Website
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 bg-accent/10 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Want to see your business here?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Reach our engaged audience of listeners. We offer flexible
            advertising packages for businesses of all sizes.
          </p>
          <Link
            href="/marketing"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-accent-foreground bg-accent rounded-lg hover:opacity-90 transition-opacity"
          >
            Advertise With Us
          </Link>
        </div>
      </div>
    </div>
  );
}
