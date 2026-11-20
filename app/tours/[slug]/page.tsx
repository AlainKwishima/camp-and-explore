import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { mountJaliTourData } from "@/data/mountJaliTour";
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

  if (slug === "mount-jali-hiking" || slug === "versailles-palace-tour") {
    return {
      title: `${mountJaliTourData.title} | Camp & Explorer`,
      description: mountJaliTourData.description,
      openGraph: {
        title: mountJaliTourData.title,
        description: mountJaliTourData.description,
        images: [mountJaliTourData.featuredImage],
      },
    };
  }

  const basicTour = toursList.find((t) => t.slug === slug);
  if (basicTour) {
    return {
      title: `${basicTour.title} | Camp & Explorer`,
      description: basicTour.description,
      openGraph: {
        title: basicTour.title,
        description: basicTour.description,
        images: [basicTour.featuredImage],
      },
    };
  }

  return {
    title: "Experience Not Found | Camp & Explorer",
  };
}

export default async function TourDetailPage({ params }: TourPageProps) {
  const { slug } = await params;

  // Primary rich tour data for Mount Jali Hiking
  let tour = (slug === "mount-jali-hiking" || slug === "versailles-palace-tour") ? mountJaliTourData : null;

  // Fallback if another tour slug is clicked: adapt from basic tour
  if (!tour) {
    const basic = toursList.find((t) => t.slug === slug);
    if (!basic) notFound();

    tour = {
      ...mountJaliTourData,
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
      images: [basic.featuredImage, ...mountJaliTourData.images.slice(1)],
      categories: basic.categories,
      highlights: basic.highlights,
      packageOptions: [
        {
          id: `${basic.id}-opt-1`,
          title: "Standard Guided Experience",
          duration: basic.duration,
          startTime: "09:00 AM",
          price: basic.price,
          description: `Full guided ${basic.title} with experienced Camp & Explorer local hosts and materials included.`,
          features: [
            "All equipment & workshop materials included",
            "Expert local guide & cultural storytelling",
            "Snacks and refreshments at Camp & Explorer",
            "Free cancellation up to 24h before",
          ],
        },
        {
          id: `${basic.id}-opt-2`,
          title: "Extended VIP / Afternoon Session",
          duration: basic.duration,
          startTime: "02:00 PM",
          price: Number((basic.price * 1.35).toFixed(2)),
          description: `Extended private session with dedicated host, complimentary take-home gift, and full afternoon tasting platter.`,
          features: [
            "Private dedicated instructor / host",
            "Complimentary artisanal souvenir / tasting pack",
            "Full tasting platter & beverages",
            "Flexible pace and custom photo stops",
          ],
        },
      ],
    };
  }

  const primaryCategory = tour.categories[0] || "Experiences";

  return (
    <div className="min-h-screen bg-white pb-28 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        {/* Dynamic Breadcrumb Trail */}
        <Breadcrumbs
          items={[
            { label: "Rwanda", href: "/" },
            { label: "Kigali", href: "/" },
            { label: "Mount Jali", href: "/" },
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
            {/* 1. Overview */}
            <TourOverview tour={tour} />

            {/* 2. Inclusions & Exclusions */}
            <InclusionsExclusions
              inclusions={tour.inclusions}
              exclusions={tour.exclusions}
            />

            {/* 3. Itinerary Timeline */}
            <ItineraryTimeline stops={tour.itinerary} totalDuration={tour.duration} />

            {/* 4. Meeting & Pickup Details */}
            <MeetingPickup departureDetails={tour.departureDetails} />

            {/* 5. Traveler Reviews & Breakdown */}
            <ReviewsSection
              reviews={tour.reviewsList}
              rating={tour.rating}
              reviewCount={tour.reviewCount}
            />

            {/* 6. Frequently Asked Questions */}
            <FaqAccordion faqs={tour.faqs} />
          </div>

          {/* Right Column: Sticky Booking Widget (~33% width on desktop) */}
          <div className="lg:col-span-4 min-w-0">
            <BookingWidget
              packageOptions={tour.packageOptions}
              basePrice={tour.price}
              tourTitle={tour.title}
            />
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom CTA Bar */}
      <StickyMobileBar price={tour.price} />
    </div>
  );
}
