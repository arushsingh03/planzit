import { AuthModal } from "./AuthModal";

export function CTA() {
  return (
    <section className="my-20 relative isolate overflow-hidden px-6 py-20 text-center sm:rounded-3xl sm:border sm:shadow-sm">
      <h2 className="font-bold text-3xl sm:text-4xl">
        Dive into PlanzIt Now! 🚀
      </h2>
      <p className="text-muted-foreground leading-8 mt-6 text-lg max-w-sm mx-auto">
        Make it easy for clients to set up meetings with you through PlanzIt.
      </p>
      <div className="mt-6">
        <AuthModal />
      </div>

      <svg
        viewBox="0 0 1024 1024"
        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
        aria-hidden="true"
      >
        <circle
          cx={512}
          cy={512}
          r={512}
          fill="url(#purple-gradient)"
          fillOpacity="0.7"
        />
        <defs>
          <radialGradient id="purple-gradient">
            <stop stopColor="#a855f7" />
            <stop offset={1} stopColor="#7e22ce" />
          </radialGradient>
        </defs>
      </svg>
    </section>
  );
}
