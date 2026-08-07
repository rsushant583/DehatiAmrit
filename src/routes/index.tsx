import { createFileRoute } from "@tanstack/react-router";
import { Loader } from "@/components/site/loader";
import { Hero } from "@/components/sections/hero";
import { Philosophy, Craft, Journey, WhyUs } from "@/components/sections/story";
import { ProductSection } from "@/components/sections/product";
import { Benefits, Reviews, RecipesSection, FaqSection } from "@/components/sections/closing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "देहाती अमृत घी | Dehati Amrit Ghee — Hand-churned, small batch" },
      {
        name: "description",
        content:
          "Dehati Amrit Ghee: hand-churned in small batches and simmered slowly. 200 gm to 5 Kg, free shipping across India. शुद्ध • सात्विक • स्वदेशी.",
      },
      { property: "og:title", content: "देहाती अमृत घी — Dehati Amrit Ghee" },
      {
        property: "og:description",
        content: "Made slowly. Shared proudly. Hand-churned ghee, sealed the day it is made.",
      },
    ],
  }),
  component: Index,
});

function goToProduct() {
  document.getElementById("product")?.scrollIntoView({ behavior: "smooth" });
}

function Index() {
  return (
    <>
      <Loader />
      <Hero onBuy={goToProduct} />
      <Philosophy />
      <Craft />
      <Journey />
      <WhyUs />
      <ProductSection />
      <Benefits />
      <Reviews />
      <RecipesSection />
      <FaqSection />
    </>
  );
}
