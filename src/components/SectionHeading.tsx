import Reveal from "./Reveal";

type Props = {
  num: string;
  label: string;
  title: string;
};

export default function SectionHeading({ num, label, title }: Props) {
  return (
    <Reveal className="mb-12 sm:mb-16">
      <div className="mb-6 flex items-center gap-4">
        <span className="font-mono text-xs text-signal">{num}</span>
        <span className="label">{label}</span>
        <span className="h-px flex-1 bg-ink-line" />
      </div>
      <h2 className="max-w-3xl text-title font-medium">{title}</h2>
    </Reveal>
  );
}
