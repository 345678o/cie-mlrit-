import { notFound } from "next/navigation";
import { getVertical, getAllVerticalIds } from "../verticals-data";
import VerticalDetailClient from "./VerticalDetailClient";

export function generateStaticParams() {
  return getAllVerticalIds().map((id) => ({ id }));
}

export default async function VerticalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vertical = getVertical(id);
  if (!vertical) notFound();
  return <VerticalDetailClient vertical={vertical} />;
}
