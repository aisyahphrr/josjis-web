import ProductDetailView from "@/src/components/views/user/product/product-detail-view";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProductDetailView productId={Number(id)} />;
}
