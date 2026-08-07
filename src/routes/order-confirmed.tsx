import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import pour from "@/assets/pour.jpg";

const searchSchema = z.object({
  id: z.string().default("DAG000000"),
  name: z.string().default(""),
});

export const Route = createFileRoute("/order-confirmed")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Order confirmed | Dehati Amrit Ghee" },
      { name: "description", content: "Your jar is being packed from the current batch." },
      { property: "og:title", content: "Order confirmed | Dehati Amrit Ghee" },
      { property: "og:description", content: "Your jar is being packed from the current batch." },
    ],
  }),
  component: OrderConfirmed,
});

function OrderConfirmed() {
  const { id, name } = Route.useSearch();

  return (
    <div className="mx-auto grid min-h-[100svh] max-w-[1400px] items-center gap-16 px-5 pb-24 pt-32 md:px-10 lg:grid-cols-[1fr_0.85fr]">
      <div>
        <span className="eyebrow">Order confirmed</span>
        <h1 className="mt-6 font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.02] text-forest-deep">
          {name ? `Thank you, ${name}.` : "Thank you."}
          <br />
          <span className="italic text-clay">It's being packed.</span>
        </h1>
        <p className="mt-7 max-w-[42ch] text-[15px] leading-[1.85] text-muted-foreground">
          Your jar comes from the batch finished this week. We'll send tracking to your email as
          soon as it leaves us — usually within 24 hours.
        </p>

        <dl className="mt-10 grid max-w-md grid-cols-2 gap-px border border-line bg-line">
          <div className="bg-cream p-6">
            <dt className="eyebrow">Order number</dt>
            <dd className="mt-2 font-display text-2xl text-forest-deep">{id}</dd>
          </div>
          <div className="bg-cream p-6">
            <dt className="eyebrow">Arrives in</dt>
            <dd className="mt-2 font-display text-2xl text-forest-deep">3–6 days</dd>
          </div>
        </dl>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/"
            className="rounded-full bg-forest px-8 py-4 text-[13px] tracking-[0.16em] text-primary-foreground uppercase transition-colors hover:bg-forest-deep"
          >
            Back home
          </Link>
          <a
            href="https://wa.me/918851795066"
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-full border border-forest/25 px-8 py-4 text-[13px] tracking-[0.16em] text-forest-deep uppercase transition-colors hover:bg-secondary"
          >
            Message us
          </a>
        </div>
      </div>

      <div className="overflow-hidden">
        <img
          src={pour}
          alt="Golden ghee poured from a brass spoon"
          width={1200}
          height={1504}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover"
        />
      </div>
    </div>
  );
}
