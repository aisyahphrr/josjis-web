import TrackingPageLeaflet from "@/src/components/views/driver/tracking/tracking-page-leaflet";

export default function TrackingPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return <TrackingPageLeaflet searchParams={searchParams} />;
}
