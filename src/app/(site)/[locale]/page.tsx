import HeroSearch from "@/components/home/HeroSearch";
import ProvidersSection from "@/components/home/ProvidersSection";
import FeaturedCitySection from "@/components/home/featured-city/FeaturedCitySection";
import LatestHotels from "@/components/home/LatestHotels";
import CTASection from "@/components/home/CTASection";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export default async function HomePage({
  params,
}: Props) {
  const { locale } = await params;

  return (
    <>
      <HeroSearch />

      <ProvidersSection />

      <FeaturedCitySection locale={locale} />

      <LatestHotels />

      <CTASection />
    </>
  );
}