type Props = {
  data: Record<string, unknown>;
};

/** Structured data for search engines, as a JSON-LD script tag. */
export default function JsonLd({ data }: Props) {
  // Escape "<" so the JSON can never close the script tag early.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
