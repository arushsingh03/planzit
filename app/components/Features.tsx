import {
  CloudUpload,
  Coins,
  EarthLock,
  Fingerprint,
  MountainSnow,
  Router,
} from "lucide-react";

const features = [
  {
    name: "Free Access",
    description:
      "Planzit simplifies scheduling with an intuitive platform that lets you arrange meetings in minutes. Focus on what matters while we handle the details. Experience fast, hassle-free scheduling today.",
    icon: Coins,
  },
  {
    name: "Secure Authentication",
    description:
      "Experience peace of mind with secure sign-ins through Google Cloud and GitHub. Your data is protected with advanced security measures, ensuring that only authorized users can access your scheduling information.",
    icon: Fingerprint,
  },
  {
    name: "Efficient Storage",
    description:
      "Easily attach files or documents to your meetings with Nylas and Uploadthing. Share essential materials with all participants, ensuring everyone is prepared and on the same page for your discussions.",
    icon: CloudUpload,
  },
  {
    name: "Seamless Integrations",
    description:
      "Connect Planzit with Google Calendar and GitHub to keep your schedules in sync. Enjoy the convenience of automatic updates, ensuring that all your scheduled meetings are reflected across your favorite tools.",
    icon: EarthLock,
  },
  {
    name: "Flexible Interface",
    description:
      "Enjoy a sleek, user-friendly design that can be customized to fit your style. With shadcn-ui components, you can personalize your scheduling experience, making it more enjoyable and tailored to your preferences.",
    icon: MountainSnow,
  },
  {
    name: "Real-Time Collaboration",
    description:
      "Engage in meetings and discussions with your team in real time. With the help of Planzit, you can share agendas, notes, and files during your meetings, allowing all participants to contribute and collaborate effectively, no matter where they are.",
    icon: Router,
  },
];

export function Features() {
  return (
    <div className="py-24">
      <div className="max-w-2xl mx-auto lg:text-center">
        <p className="font-semibold text-primary leading-7">
          Schedule in a Snap
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Fast-Track Your Meeting Plans!
        </h1>
        <p className="mt-6 text-base text-muted-foreground leading-snug">
          With Planzit, scheduling meetings is quick and hassle-free! Get your
          meetings set up in just minutes, ensuring a smooth and efficient
          experience. Enjoy the simplicity of fast scheduling!
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid max-w-xl gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <div className="text-base font-medium leading-7">
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="size-6 text-white" />
                </div>
                {feature.name}
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-snug">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
