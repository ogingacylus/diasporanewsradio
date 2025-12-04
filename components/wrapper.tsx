export default function Wrapper({
  title,
  description,
  loadMessage,
}: {
  title: string;
  description: string;
  loadMessage: string;
}) {
  return (
    <section className="w-full bg-card py-16 pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-2 text-muted-foreground">{description}</p>
        </div>
        <div className="text-center py-12 flex gap-2 items-center justify-center font-bold">
          <p className="animate-pulse text-3xl text-accent">
            Loading {loadMessage} .....
          </p>
        </div>
      </div>
    </section>
  );
}
