import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVertical, getAllVerticalIds } from "../verticals-data";
import VerticalDetailClient from "./VerticalDetailClient";

export function generateStaticParams() {
  return getAllVerticalIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const vertical = getVertical(id);
  if (!vertical) return {};

  const title = `${vertical.name} | MLRIT CIE`;
  return {
    title: vertical.name,
    description: vertical.shortDesc,
    openGraph: {
      title,
      description: vertical.shortDesc,
      url: `https://mlritcie.in/verticals/${vertical.id}`,
    },
  };
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
