import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Clock3, Stethoscope } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { CSSProperties } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
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
  {
    title: "Vitiligo",
    image: vitiligoAsset.url,
    duration: "6 Months Treatment",
    doctors: "Dr. Kushal A Somani & Dr. Antim Somani",
    summary: "White facial patches visibly reduced with natural homoeopathic treatment.",
    details: "Prominent depigmented patches achieved visible repigmentation and a more even natural skin tone through individualized constitutional homoeopathic care.",
  },
  {
    title: "Corn",
    image: cornAsset.url,
    duration: "8 Weeks Treatment",
    doctors: "Dr. Kushal A Somani",
    summary: "Painful thickened skin on the foot cleared, leaving smooth skin.",
    details: "The hardened corn and surrounding discomfort improved steadily with individualized internal treatment, restoring smoother skin and comfortable movement.",
  },
  {
    title: "Warts",
    image: wartsAsset.url,
    duration: "3 Months Treatment",
    doctors: "Dr. Antim Somani",
    summary: "Multiple facial warts cleared with a visible improvement in skin texture.",
    details: "Scattered facial warts were treated constitutionally without destructive local procedures, supporting clear skin while minimizing the risk of marks and recurrence.",
  },
  {
    title: "Non-healing Wound",
    image: woundAsset.url,
    duration: "4 Months Treatment",
    doctors: "Dr. Kushal A Somani & Dr. Antim Somani",
    summary: "A persistent foot wound closed with healthier surrounding skin.",
    details: "The chronic wound showed progressive closure and tissue recovery under individualized care, with attention to the patient’s overall health and healing response.",
  },
  {
    title: "Molluscum Contagiosum",
    image: molluscumAsset.url,
    duration: "3 Months Treatment",
    doctors: "Dr. Kushal A Somani",
    summary: "Multiple facial lesions cleared, restoring smooth and healthy-looking skin.",
    details: "Clusters of molluscum lesions around the face and chin resolved through gentle constitutional homoeopathic treatment without painful removal procedures.",
  },
  {
    title: "Mouth Ulcer",
    image: mouthAsset.url,
    duration: "6 Weeks Treatment",
    doctors: "Dr. Antim Somani",
    summary: "Severe oral ulceration healed with improved comfort and movement.",
    details: "Painful extensive mouth ulceration improved through individualized internal treatment, supporting tissue healing and comfortable eating and speaking.",
  },
  {
    title: "Plaque Psoriasis",
    image: psoriasisAsset.url,
    duration: "5 Months Treatment",
    doctors: "Dr. Antim Somani (Founder)",
    summary: "Thick, scaly plaques on elbow and forearm improved to healthy, smooth skin.",
    details: "Extensive white scaly psoriatic plaques on the elbow and arm completely softened and cleared. Immune-mediated inflammation was addressed from within, restoring smooth, healthy skin tissue.",
  },
  {
    title: "Vitiligo (Leucoderma)",
    image: vitiligoTreatmentAsset.url,
    duration: "6 Months Treatment",
    doctors: "Dr. Kushal A Somani & Dr. Antim Somani",
    summary: "White patches on the neck reduced with natural homoeopathic treatment.",
    details: "A prominent depigmented vitiligo patch on the neck achieved visible melanocyte activation and repigmentation. Natural skin tone was restored through internal homoeopathic immune balancing.",
  },
  {
    title: "Skin Fungal Infection",
    image: fungalAsset.url,
    duration: "8 Weeks Treatment",
    doctors: "Dr. Kushal A Somani & Dr. Antim Somani",
    summary: "Ringworm patch on cheek cleared completely without topical steroids.",
    details: "A chronic facial ringworm patch on the cheek and jawline healed using individualized constitutional homoeopathy. Zero steroid ointments were used, helping avoid skin thinning and recurrence.",
  },
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
  const [caseOpen, setCaseOpen] = useState(false);
  const activeTreatment = treatments[active] ?? treatments[0];
  if (!activeTreatment) return null;
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
      <div className="gallery-backdrop" aria-hidden="true">
        <img src={activeTreatment.image} alt="" />
      </div>
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
                <Button
                  variant="ghost"
                  className="gallery-card h-full w-full overflow-hidden rounded-md border border-border bg-card p-0 shadow-gallery"
                  onClick={() => setCaseOpen(true)}
                  aria-label={`View full case details for ${treatment.title}`}
                >
                  <img
                    src={treatment.image}
                    alt={`${treatment.title} before and after treatment result`}
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </Button>
                <div className="reflection mt-3 overflow-hidden rounded-md" aria-hidden="true">
                  <img src={treatment.image} alt="" className="h-full w-full object-cover" draggable={false} />
                </div>
                {offset === 0 && (
                  <div className="absolute -bottom-14 left-1/2 w-72 -translate-x-1/2 text-center sm:-bottom-16">
                    <h2 className="font-display text-xl font-semibold sm:text-2xl">{treatment.title}</h2>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Click to view case</p>
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

      <Dialog open={caseOpen} onOpenChange={setCaseOpen}>
        <DialogContent className="case-dialog max-h-[92vh] w-[calc(100%-1.5rem)] max-w-6xl overflow-y-auto border-border bg-card p-0 shadow-gallery sm:rounded-md">
          <div key={active} className="case-content grid animate-in fade-in-0 duration-500 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="case-image-wrap min-h-[360px] overflow-hidden bg-muted lg:min-h-[670px]">
              <img
                src={activeTreatment.image}
                alt={`${activeTreatment.title} before and after result`}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Patient case study</p>
              <DialogTitle className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
                {activeTreatment.title}
              </DialogTitle>
              <DialogDescription className="mt-5 text-base leading-7 text-foreground">
                {activeTreatment.summary}
              </DialogDescription>

              <dl className="mt-7 grid gap-3 border-y border-border py-5 sm:grid-cols-2">
                <div className="flex gap-3">
                  <Clock3 className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Duration</dt>
                    <dd className="mt-1 text-sm font-semibold">{activeTreatment.duration}</dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Stethoscope className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Doctor</dt>
                    <dd className="mt-1 text-sm font-semibold leading-5">{activeTreatment.doctors}</dd>
                  </div>
                </div>
              </dl>

              <div className="mt-7">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Full case details</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">{activeTreatment.details}</p>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
                <Button variant="outline" size="icon" onClick={() => move(-1)} aria-label="Previous case">
                  <ChevronLeft />
                </Button>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Case {String(active + 1).padStart(2, "0")} of {String(treatments.length).padStart(2, "0")}
                </p>
                <Button variant="outline" size="icon" onClick={() => move(1)} aria-label="Next case">
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
