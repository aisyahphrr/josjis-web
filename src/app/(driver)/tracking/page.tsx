import TrackingPageDeckGL from "@/src/components/views/driver/tracking/tracking-page-deckgl";

export default function TrackingPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return <TrackingPageDeckGL searchParams={searchParams} />;
}
