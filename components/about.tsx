"use client"

import { Award, Users, Zap } from "lucide-react"

export function About() {
  const values = [
    {
      icon: Zap,
      title: "Innovation",
      description: "Cutting-edge technology delivering premium audio experiences to listeners worldwide.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Creating meaningful connections between artists, hosts, and millions of passionate listeners.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Award-winning programming and commitment to the highest quality standards.",
    },
  ]

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">About WAVE Radio</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Since 2015, WAVE Radio has been a leading voice in global broadcasting, delivering exceptional content
              across multiple genres. With a network of talented hosts, producers, and journalists, we bring the world's
              best music, news, and entertainment directly to your ears.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our mission is simple: to inspire, entertain, and connect people through the power of audio. Whether
              you're commuting, working, or relaxing, WAVE Radio is your perfect companion.
            </p>

            <div className="space-y-4">
              {values.map((value, idx) => {
                const Icon = value.icon
                return (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-6">
            <div className="rounded-2xl border border-border bg-card p-8 hover:border-accent transition-colors">
              <div className="text-4xl font-bold text-accent mb-2">50M+</div>
              <p className="text-foreground font-medium mb-1">Active Listeners</p>
              <p className="text-sm text-muted-foreground">Streaming across 150+ countries</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8 hover:border-accent transition-colors">
              <div className="text-4xl font-bold text-accent mb-2">500+</div>
              <p className="text-foreground font-medium mb-1">Professional Hosts</p>
              <p className="text-sm text-muted-foreground">Delivering premium content 24/7</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8 hover:border-accent transition-colors">
              <div className="text-4xl font-bold text-accent mb-2">24/7</div>
              <p className="text-foreground font-medium mb-1">Non-Stop Broadcasting</p>
              <p className="text-sm text-muted-foreground">Never miss your favorite shows</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
