import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { CSSProperties } from "react";

import { Button } from "@/components/ui/button";
import vitiligoAsset from "@/assets/vitiligo.jpeg.asset.json";
import cornAsset from "@/assets/corn.jpeg.asset.json";
import wartsAsset from "@/assets/warts.jpeg.asset.json";
import woundAsset from "@/assets/nonhealingwound.jpeg.asset.json";
import molluscumAsset from "@/assets/molluscum.jpeg.asset.json";
import mouthAsset from "@/assets/MOUTH.jpeg.asset.json";
import psoriasisAsset from "@/assets/AHRPTWmyYFIMTOwkuVBoJP7qihtwkx2BSHnQsDTn5K6MnEahRwIZvyIK17CNQgGG0eoLPmnvEfJxOAiZsZURcSelCeRZcPKGkZZOz9SbzFnLQhuhnUGdxPMWC1LALSpHNyLYIuU8BdnjySGK7AYw1080-h1366-k-no.jpg.asset.json";
import vitiligoTreatmentAsset from "@/assets/AHRPTWlD4duMACYTX4RhjkSYuskPTF9aeXWgubRQEt5pg1OunusinCxu3b_DaSoeDb0YdMA6vc2MvV1RnATvVX3VtvjPa3ma-wH56aqeNb_XsgHmEww952ojJl1Ai9_5TOR3ewEWGb5jVItYZtILw1024-h1280-k-no.jpg.asset.json";
import fungalAsset from "@/assets/AHRPTWmP06Fx4ZwxlDU_HZfQj0jdB1WlUuBbZpYlNVchT1aF3HARUpVz9TJtLjwlPasdXBEByJtOhA1n_wtcJThky8PnDX7eCSc9J1COrlTWNWekxLhjOikwXRO_xNSbGXXCZJuXCV42QfK1-iJ_w1024-h1280-k-no.jpg.asset.json";

const treatments = [
  { title: "Vitiligo", image: vitiligoAsset.url },
  { title: "Corn", image: cornAsset.url },
  { title: "Warts", image: wartsAsset.url },
  { title: "Non-healing wound", image: woundAsset.url },
  { title: "Molluscum contagiosum", image: molluscumAsset.url },
  { title: "Mouth ulcer", image: mouthAsset.url },
  { title: "Psoriasis", image: psoriasisAsset.url },
  { title: "Vitiligo treatment", image: vitiligoTreatmentAsset.url },
  { title: "Skin fungal infection", image: fungalAsset.url },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Before & After Treatment Gallery | Dr Somani's Homoeopathy" },
      {
        name: "description",
        content: "Explore documented before and after treatment results from Dr Somani's Homoeopathy.",
      },
      { property: "og:title", content: "Before & After Treatment Gallery | Dr Somani's Homoeopathy" },
      {
        property: "og:description",
        content: "A visual gallery of documented treatment journeys and outcomes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [active, setActive] = useState(0);
  const move = useCallback((step: number) => {
    setActive((current) => (current + step + treatments.length) % treatments.length);
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [move]);

  return (
    <main className="gallery-shell min-h-screen overflow-hidden bg-background text-foreground">
      <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-5 pt-7 sm:px-8 sm:pt-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Dr Somani's Homoeopathy</p>
          <p className="mt-1 text-xs text-muted-foreground">Real treatment journeys</p>
        </div>
        <div className="h-px w-16 bg-border sm:w-32" aria-hidden="true" />
      </header>

      <section className="relative mx-auto flex min-h-[calc(100vh-92px)] w-full max-w-[1500px] flex-col items-center justify-center px-4 pb-8 pt-7 sm:px-8">
        <div className="relative z-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary">Transformation gallery</p>
          <h1 className="mt-2 font-display text-4xl font-semibold sm:text-6xl">Before &amp; After</h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
            Documented progress across a range of skin and wellness concerns.
          </p>
        </div>

        <div className="carousel-stage relative mt-8 h-[430px] w-full sm:h-[520px]" aria-live="polite">
          {treatments.map((treatment, index) => {
            let offset = index - active;
            if (offset > treatments.length / 2) offset -= treatments.length;
            if (offset < -treatments.length / 2) offset += treatments.length;
            const distance = Math.abs(offset);
            return (
              <article
                key={treatment.title}
                className="vinyl-slide absolute left-1/2 top-1/2"
                data-active={offset === 0}
                aria-hidden={distance > 2}
                style={{
                  "--slide-offset": offset,
                  "--slide-distance": distance,
                  zIndex: treatments.length - distance,
                  opacity: distance > 2 ? 0 : 1,
                  pointerEvents: offset === 0 ? "auto" : "none",
                } as CSSProperties}
              >
                <div className="gallery-card overflow-hidden rounded-md border border-border bg-card shadow-gallery">
                  <img
                    src={treatment.image}
                    alt={`${treatment.title} before and after treatment result`}
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </div>
                <div className="reflection mt-3 overflow-hidden rounded-md" aria-hidden="true">
                  <img src={treatment.image} alt="" className="h-full w-full object-cover" draggable={false} />
                </div>
                {offset === 0 && (
                  <div className="absolute -bottom-14 left-1/2 w-72 -translate-x-1/2 text-center sm:-bottom-16">
                    <h2 className="font-display text-xl font-semibold sm:text-2xl">{treatment.title}</h2>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Before · After</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <nav className="relative z-20 mt-2 flex items-center gap-4" aria-label="Treatment gallery navigation">
          <Button variant="outline" size="icon" onClick={() => move(-1)} aria-label="Previous treatment">
            <ChevronLeft />
          </Button>
          <p className="min-w-16 text-center text-sm tabular-nums text-muted-foreground">
            {String(active + 1).padStart(2, "0")} / {String(treatments.length).padStart(2, "0")}
          </p>
          <Button variant="outline" size="icon" onClick={() => move(1)} aria-label="Next treatment">
            <ChevronRight />
          </Button>
        </nav>

        <p className="relative z-10 mt-5 max-w-xl text-center text-xs leading-5 text-muted-foreground">
          Individual results vary. Images are shared for educational purposes with patient privacy protected.
        </p>
      </section>
    </main>
  );
}
