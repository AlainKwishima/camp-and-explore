import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { versaillesTourData } from "@/data/versaillesTour";
import { toursList } from "@/data/tours";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { TourHeader } from "@/components/tour-detail/TourHeader";
import { PhotoGallery } from "@/components/tour-detail/PhotoGallery";
import { TourNavigationTabs } from "@/components/tour-detail/TourNavigationTabs";
import { TourOverview } from "@/components/tour-detail/TourOverview";
import { InclusionsExclusions } from "@/components/tour-detail/InclusionsExclusions";
import { ItineraryTimeline } from "@/components/tour-detail/ItineraryTimeline";
import { MeetingPickup } from "@/components/tour-detail/MeetingPickup";
import { ReviewsSection } from "@/components/tour-detail/ReviewsSection";
import { FaqAccordion } from "@/components/tour-detail/FaqAccordion";
import { BookingWidget } from "@/components/tour-detail/BookingWidget";
import { StickyMobileBar } from "@/components/tour-detail/StickyMobileBar";

interface TourPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return toursList.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: TourPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "versailles-palace-tour") {
    return {
      title: `${versaillesTourData.title} | Viator`,
      description: versaillesTourData.description,
      openGraph: {
        title: versaillesTourData.title,
        description: versaillesTourData.description,
        images: [versaillesTourData.featuredImage],
      },
    };
  }

  const basicTour = toursList.find((t) => t.slug === slug);
  if (basicTour) {
    return {
      title: `${basicTour.title} | Viator`,
      description: basicTour.description,
    };
  }

  return {
    title: "Tour Not Found | Viator",
  };
}

export default async function TourDetailPage({ params }: TourPageProps) {
  const { slug } = await params;

  // Primary rich tour data for the Versailles Palace Tour
  let tour = slug === "versailles-palace-tour" ? versaillesTourData : null;

  // Fallback if another tour slug is clicked: adapt from basic tour
  if (!tour) {
    const basic = toursList.find((t) => t.slug === slug);
    if (!basic) notFound();

    tour = {
      ...versaillesTourData,
      id: basic.id,
      slug: basic.slug,
      title: basic.title,
      description: basic.description,
      overview: basic.description,
      rating: basic.rating,
      reviewCount: basic.reviewCount,
      duration: basic.duration,
      price: basic.price,
      featuredImage: basic.featuredImage,
      images: [basic.featuredImage, ...versaillesTourData.images.slice(1)],
      categories: basic.categories,
      highlights: basic.highlights,
    };
  }

  const primaryCategory = tour.categories[0] || "Tours";

  return (
    <div className="min-h-screen bg-white pb-28 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        {/* Dynamic Breadcrumb Trail */}
        <Breadcrumbs
          items={[
            { label: "France", href: "/" },
            { label: "Paris", href: "/" },
            { label: primaryCategory, href: "/" },
            { label: tour.title },
          ]}
        />

        {/* Tour Header: Badges, Title, Ratings, Actions */}
        <TourHeader tour={tour} />

        {/* 5-Photo Mosaic Hero Gallery + Lightbox Modal */}
        <PhotoGallery images={tour.images} tourTitle={tour.title} />

        {/* Sticky Scroll Navigation Tabs */}
        <TourNavigationTabs />

        {/* Main Content Layout: Two-Column (Details + Booking Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mt-6">
          {/* Left Column: Tour Details (~67% width on desktop) */}
          <div className="lg:col-span-8 space-y-2 min-w-0">
            <TourOverview tour={tour} />
            <InclusionsExclusions
              inclusions={tour.inclusions}
              exclusions={tour.exclusions}
            />
            <ItineraryTimeline
              stops={tour.itinerary}
              totalDuration={tour.duration}
            />
            <MeetingPickup details={tour.departureDetails} />
            <ReviewsSection
              rating={tour.rating}
              reviewCount={tour.reviewCount}
              reviews={tour.reviewsList}
            />
            <FaqAccordion faqs={tour.faqs} />
          </div>

          {/* Right Column: Sticky Booking Widget (~33% width on desktop) */}
          <div id="booking-section" className="lg:col-span-4 scroll-mt-28">
            <BookingWidget
              packageOptions={tour.packageOptions}
              basePrice={tour.price}
              tourTitle={tour.title}
            />
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Booking Bar */}
      <StickyMobileBar price={tour.price} />
    </div>
  );
}
