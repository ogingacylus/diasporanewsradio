import { LockKeyhole } from "lucide-react";

export function SiteLocked() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/10 px-6 py-16">
      <section className="w-full max-w-xl rounded-2xl border border-primary/20 bg-card p-8 text-center shadow-xl sm:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <LockKeyhole size={32} aria-hidden="true" />
        </div>
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
          Site unavailable
        </h1>
        <p className="text-lg text-muted-foreground">
          This site is currently unavailable. Please contact your system
          administrator.
        </p>
      </section>
    </main>
  );
}
