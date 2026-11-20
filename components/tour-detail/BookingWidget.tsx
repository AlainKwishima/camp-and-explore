"use client";

import React, { useState, useId, useEffect, useCallback } from "react";
import { PackageOption, CustomerBooking, SpecialRequirements } from "@/types/tour";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import {
  Calendar as CalendarIcon,
  Users,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  X,
  CreditCard,
  AlertCircle,
  Utensils,
  Accessibility,
  Luggage,
  MessageSquare,
  Printer,
  Check,
  Info,
  ChevronRight,
} from "lucide-react";

interface BookingWidgetProps {
  packageOptions: PackageOption[];
  basePrice: number;
  tourTitle: string;
}

// Preset dietary choices
const DIETARY_OPTIONS = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Nut / Peanut Allergy",
  "Dairy / Lactose-Free",
  "Halal",
  "Kosher",
  "Shellfish Allergy",
  "No Dietary Restrictions",
];

// Preset accessibility options
const ACCESSIBILITY_OPTIONS = [
  "Wheelchair Accessible Route",
  "Gentle / Slow Walking Pace",
  "Stroller / Pram Friendly",
  "Registered Service Animal",
  "Audio Guide / Hearing Assistance",
  "No Special Needs",
];

// Preset preparation & items choices
const PREPARATION_OPTIONS = [
  "Luggage / Large Bag Storage Needed",
  "Baby Stroller / Carrier",
  "Professional Camera / Tripod",
  "Special Medical Equipment",
  "All Standard Gear (Nothing Special)",
];

export function BookingWidget({ packageOptions, basePrice, tourTitle }: BookingWidgetProps) {
  const datePickerId = useId();
  const [selectedDate, setSelectedDate] = useState<string>("2026-11-25");
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string>(packageOptions[0].id);

  // Popover toggles in the sidebar widget
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTravelerPicker, setShowTravelerPicker] = useState<boolean>(false);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalStep, setModalStep] = useState<"form" | "confirmed">("form");

  // Form Fields - Contact
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form Fields - Special Requirements
  const [isSpecialReqExpanded, setIsSpecialReqExpanded] = useState<boolean>(true);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [dietaryNotes, setDietaryNotes] = useState<string>("");
  const [selectedAccessibility, setSelectedAccessibility] = useState<string[]>([]);
  const [accessibilityNotes, setAccessibilityNotes] = useState<string>("");
  const [selectedPreparation, setSelectedPreparation] = useState<string[]>([]);
  const [preparationNotes, setPreparationNotes] = useState<string>("");
  const [otherRequests, setOtherRequests] = useState<string>("");

  // Last confirmed booking record
  const [lastBooking, setLastBooking] = useState<CustomerBooking | null>(null);

  // Hook to completely disable background page scrolling when modal is active
  useLockBodyScroll(isModalOpen);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const activeOption =
    packageOptions.find((opt) => opt.id === selectedOptionId) || packageOptions[0];

  // Dynamic price calculation
  const totalTravelers = adults + children;
  const adultTotal = adults * activeOption.price;
  const childTotal = children * (activeOption.price * 0.75); // 25% discount for children
  const totalPrice = adultTotal + childTotal;

  // Toggle helper for multi-choice chips
  const toggleSelection = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    item: string,
    mutuallyExclusiveItem?: string
  ) => {
    if (mutuallyExclusiveItem && item === mutuallyExclusiveItem) {
      if (list.includes(item)) {
        setList([]);
      } else {
        setList([item]);
      }
      return;
    }

    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      const filtered = mutuallyExclusiveItem
        ? list.filter((i) => i !== mutuallyExclusiveItem)
        : list;
      setList([...filtered, item]);
    }
  };

  const handleOpenBookingModal = () => {
    setShowDatePicker(false);
    setShowTravelerPicker(false);
    setModalStep("form");
    setErrors({});
    setIsModalOpen(true);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!phone.trim()) {
      newErrors.phone = "Please enter a contact phone number.";
    } else if (phone.trim().length < 6) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll modal to top of form errors if needed
      const formEl = document.getElementById("booking-modal-body");
      if (formEl) formEl.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Build unique booking reference code
    const bookingCode = `CE-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const specialReq: SpecialRequirements = {
      dietaryRestrictions: selectedDietary,
      otherDietaryOrAllergies: dietaryNotes.trim() || undefined,
      accessibilityNeeds: selectedAccessibility,
      otherSpecialNeeds: accessibilityNotes.trim() || undefined,
      itemsToBringOrPrepare: selectedPreparation,
      equipmentOrLuggageNotes: preparationNotes.trim() || undefined,
      otherRequests: otherRequests.trim() || undefined,
    };

    const newBooking: CustomerBooking = {
      id: bookingCode,
      tourTitle,
      packageId: activeOption.id,
      packageTitle: activeOption.title,
      departureDate: selectedDate,
      departureTime: activeOption.startTime,
      adults,
      children,
      totalTravelers,
      totalPrice,
      currency: "USD",
      leadTraveler: {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
      },
      specialRequirements: specialReq,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    // Save with persistent localStorage for team review
    try {
      const existing = localStorage.getItem("camp_explorer_bookings");
      const bookingsList: CustomerBooking[] = existing ? JSON.parse(existing) : [];
      bookingsList.unshift(newBooking);
      localStorage.setItem("camp_explorer_bookings", JSON.stringify(bookingsList));
    } catch (err) {
      console.warn("Could not save to localStorage:", err);
    }

    setLastBooking(newBooking);
    setModalStep("confirmed");
  };

  return (
    <div
      id="booking-section"
      className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 shadow-sidebar sticky top-28 space-y-5"
    >
      {/* Price Header */}
      <div className="pb-4 border-b border-neutral-200">
        <div className="flex items-baseline justify-between flex-wrap gap-2">
          <div>
            <span className="text-xs text-neutral-500 block leading-tight font-medium">From</span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight font-display">
                ${activeOption.price.toFixed(2)}
              </span>
              <span className="text-xs text-neutral-500 font-medium">per adult</span>
            </div>
          </div>
          <span className="text-[11px] font-bold text-brand-dark bg-brand-light px-2.5 py-1 rounded-full border border-brand-primary/20">
            Lowest Price Guarantee
          </span>
        </div>
      </div>

      {/* Select Date & Travelers Row */}
      <div className="space-y-3">
        {/* Date Selector Box */}
        <div className="relative">
          <label htmlFor={datePickerId} className="text-xs font-bold text-neutral-700 block mb-1">
            Select Date
          </label>
          <button
            id={datePickerId}
            type="button"
            onClick={() => {
              setShowDatePicker(!showDatePicker);
              setShowTravelerPicker(false);
            }}
            className="w-full flex items-center justify-between p-3 border border-neutral-300 hover:border-neutral-400 rounded-xl text-xs font-semibold text-neutral-800 bg-white shadow-sm transition-colors text-left"
          >
            <div className="flex items-center space-x-2 truncate pr-2">
              <CalendarIcon className="w-4 h-4 text-brand-primary flex-shrink-0" />
              <span className="truncate">
                {new Date(selectedDate).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-neutral-400 flex-shrink-0" />
          </button>

          {/* Date Picker Dropdown Popover */}
          {showDatePicker && (
            <div className="absolute top-full left-0 right-0 mt-2 z-30 bg-white border border-neutral-200 rounded-xl p-4 shadow-modal">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-100">
                <span className="text-xs font-bold text-neutral-900">Choose Departure Date</span>
                <button
                  type="button"
                  onClick={() => setShowDatePicker(false)}
                  className="text-neutral-400 hover:text-neutral-700 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Preset Dates */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { label: "Tomorrow", date: "2026-11-21" },
                  { label: "This Weekend", date: "2026-11-22" },
                  { label: "Next Monday", date: "2026-11-23" },
                  { label: "Next Wednesday", date: "2026-11-25" },
                ].map((preset) => (
                  <button
                    key={preset.date}
                    type="button"
                    onClick={() => {
                      setSelectedDate(preset.date);
                      setShowDatePicker(false);
                    }}
                    className={`py-2 px-2.5 rounded-lg border text-left transition-colors ${
                      selectedDate === preset.date
                        ? "border-brand-primary bg-brand-light text-brand-dark font-bold"
                        : "border-neutral-200 hover:bg-neutral-50 text-neutral-800"
                    }`}
                  >
                    <span className="block font-semibold">{preset.label}</span>
                    <span className="text-[10px] text-neutral-500">{preset.date}</span>
                  </button>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-100">
                <label className="text-[11px] font-medium text-neutral-500 block mb-1">
                  Or pick a specific date:
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min="2026-11-20"
                  onChange={(e) => {
                    if (e.target.value) {
                      setSelectedDate(e.target.value);
                      setShowDatePicker(false);
                    }
                  }}
                  className="w-full text-xs p-2 border border-neutral-300 rounded-lg outline-none focus:ring-1 focus:ring-brand-primary"
                />
              </div>
            </div>
          )}
        </div>

        {/* Travelers Selector Box */}
        <div className="relative">
          <label className="text-xs font-bold text-neutral-700 block mb-1">Travelers</label>
          <button
            type="button"
            onClick={() => {
              setShowTravelerPicker(!showTravelerPicker);
              setShowDatePicker(false);
            }}
            className="w-full flex items-center justify-between p-3 border border-neutral-300 hover:border-neutral-400 rounded-xl text-xs font-semibold text-neutral-800 bg-white shadow-sm transition-colors text-left"
          >
            <div className="flex items-center space-x-2 truncate pr-2">
              <Users className="w-4 h-4 text-brand-primary flex-shrink-0" />
              <span className="truncate">
                {adults} {adults === 1 ? "Adult" : "Adults"}
                {children > 0 && `, ${children} ${children === 1 ? "Child" : "Children"}`}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-neutral-400 flex-shrink-0" />
          </button>

          {/* Travelers Popover */}
          {showTravelerPicker && (
            <div className="absolute top-full left-0 right-0 mt-2 z-30 bg-white border border-neutral-200 rounded-xl p-4 shadow-modal space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                <span className="text-xs font-bold text-neutral-900">Select Guests</span>
                <button
                  type="button"
                  onClick={() => setShowTravelerPicker(false)}
                  className="text-neutral-400 hover:text-neutral-700 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Adults Counter */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-neutral-900 block">Adults</span>
                  <span className="text-[11px] text-neutral-500">Age 18+</span>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    disabled={adults <= 1}
                    onClick={() => setAdults((a) => Math.max(1, a - 1))}
                    className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center font-bold text-sm text-neutral-700 disabled:opacity-30 hover:border-neutral-400 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-4 text-center font-bold text-xs">{adults}</span>
                  <button
                    type="button"
                    onClick={() => setAdults((a) => Math.min(15, a + 1))}
                    className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center font-bold text-sm text-neutral-700 hover:border-neutral-400 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Children Counter */}
              <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                <div>
                  <span className="text-xs font-bold text-neutral-900 block">Children</span>
                  <span className="text-[11px] text-neutral-500">Age 4-17 (25% off)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    disabled={children <= 0}
                    onClick={() => setChildren((c) => Math.max(0, c - 1))}
                    className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center font-bold text-sm text-neutral-700 disabled:opacity-30 hover:border-neutral-400 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-4 text-center font-bold text-xs">{children}</span>
                  <button
                    type="button"
                    onClick={() => setChildren((c) => Math.min(10, c + 1))}
                    className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center font-bold text-sm text-neutral-700 hover:border-neutral-400 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowTravelerPicker(false)}
                className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Package Options Radio List */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-neutral-700 block">Choose Tour Package</label>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {packageOptions.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => setSelectedOptionId(opt.id)}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                  isSelected
                    ? "border-brand-primary bg-brand-light/40 ring-1 ring-brand-primary"
                    : "border-neutral-200 hover:border-neutral-300 bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start space-x-2.5 min-w-0">
                    <input
                      type="radio"
                      name="packageOption"
                      checked={isSelected}
                      onChange={() => setSelectedOptionId(opt.id)}
                      className="mt-0.5 text-brand-primary focus:ring-brand-primary flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-neutral-900 leading-snug">{opt.title}</h4>
                      <div className="flex items-center space-x-1.5 text-[11px] text-neutral-500 mt-0.5">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-0.5 flex-shrink-0" />
                          <span>{opt.duration}</span>
                        </span>
                        <span>•</span>
                        <span>Departs {opt.startTime}</span>
                      </div>
                    </div>
                  </div>
                  <span className="font-extrabold text-neutral-900 whitespace-nowrap pl-1 text-right">
                    ${opt.price.toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Total Price Summary Box */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 space-y-2 text-xs">
        <div className="flex justify-between text-neutral-600">
          <span>
            {adults} {adults === 1 ? "Adult" : "Adults"} × ${activeOption.price.toFixed(2)}
          </span>
          <span className="font-medium text-neutral-900">${adultTotal.toFixed(2)}</span>
        </div>

        {children > 0 && (
          <div className="flex justify-between text-neutral-600">
            <span>
              {children} {children === 1 ? "Child" : "Children"} × ${(activeOption.price * 0.75).toFixed(2)}
            </span>
            <span className="font-medium text-neutral-900">${childTotal.toFixed(2)}</span>
          </div>
        )}

        <div className="pt-2 border-t border-neutral-200 flex items-baseline justify-between font-bold text-neutral-900">
          <span className="text-sm">Total Price</span>
          <span className="text-xl text-brand-dark font-extrabold font-display">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
        <p className="text-[10px] text-neutral-500 text-right">Taxes and all booking fees included</p>
      </div>

      {/* Main Call to Action Button */}
      <button
        type="button"
        onClick={handleOpenBookingModal}
        className="w-full py-3.5 px-4 bg-brand-primary hover:bg-brand-hover text-white text-sm font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 active:scale-[0.99]"
      >
        <Sparkles className="w-4 h-4 fill-current" />
        <span>Reserve Now & Pay Later</span>
      </button>

      {/* Risk-Free Assurance Badges */}
      <div className="space-y-2 text-xs text-neutral-600 pt-2 border-t border-neutral-100">
        <div className="flex items-center space-x-2 text-brand-dark">
          <ShieldCheck className="w-4 h-4 text-brand-primary flex-shrink-0" />
          <span className="font-semibold">Free cancellation up to 24 hours before tour</span>
        </div>
        <div className="flex items-center space-x-2 text-neutral-600">
          <CreditCard className="w-4 h-4 text-neutral-400 flex-shrink-0" />
          <span>Pay nothing today. Lock in your spot now.</span>
        </div>
      </div>

      {/* POPUP MODAL: Scroll-Locked Background Overlay */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
          onClick={(e) => {
            // Close when clicking directly on the backdrop outside the modal dialog box
            if (e.target === e.currentTarget) {
              setIsModalOpen(false);
            }
          }}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm overflow-y-auto overscroll-contain p-3 sm:p-5 flex items-center justify-center animate-fadeIn"
        >
          <div
            id="booking-modal-dialog"
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden my-auto"
          >
            {/* Modal Fixed Header */}
            <div className="px-5 sm:px-6 py-4 border-b border-neutral-200 bg-white flex items-center justify-between sticky top-0 z-20">
              <div className="min-w-0 pr-4">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                  <h3 id="booking-modal-title" className="text-base sm:text-lg font-extrabold text-neutral-900 truncate">
                    {modalStep === "form" ? "Complete Your Reservation" : "Reservation Confirmed"}
                  </h3>
                </div>
                <p className="text-xs text-neutral-500 mt-0.5 truncate">
                  {modalStep === "form"
                    ? "Lock in your tickets now • Pay $0.00 today with Free Cancellation"
                    : `Booking Reference: ${lastBooking?.id || "CE-2026-CONFIRMED"}`}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 flex items-center justify-center transition-colors flex-shrink-0"
                aria-label="Close booking modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div id="booking-modal-body" className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
              {modalStep === "form" ? (
                <form onSubmit={handleSubmitBooking} className="space-y-6">
                  {/* Trip Summary Card */}
                  <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-xs space-y-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold tracking-wider uppercase text-brand-dark bg-brand-light px-2 py-0.5 rounded-md inline-block mb-1">
                          Tour Selection
                        </span>
                        <h4 className="font-bold text-neutral-900 text-sm leading-snug">{tourTitle}</h4>
                        <p className="text-neutral-600 mt-0.5 font-medium">{activeOption.title}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-[11px] text-neutral-500 block">Total Due</span>
                        <span className="text-lg font-extrabold text-brand-dark font-display">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-neutral-200 text-neutral-700">
                      <div>
                        <span className="text-neutral-400 block text-[10px]">Date</span>
                        <span className="font-semibold text-neutral-900">{selectedDate}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[10px]">Time & Duration</span>
                        <span className="font-semibold text-neutral-900">
                          {activeOption.startTime} ({activeOption.duration})
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[10px]">Travelers</span>
                        <span className="font-semibold text-neutral-900">
                          {totalTravelers} {totalTravelers === 1 ? "Guest" : "Guests"} ({adults} Ad
                          {children > 0 && `, ${children} Ch`})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 1: Lead Guest Contact Information */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 pb-1 border-b border-neutral-200">
                      <Users className="w-4 h-4 text-brand-primary" />
                      <h4 className="text-sm font-bold text-neutral-900">Lead Traveler Information</h4>
                      <span className="text-[11px] text-neutral-500 ml-auto">Required</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {/* Full Name */}
                      <div className="sm:col-span-2">
                        <label className="font-semibold text-neutral-700 block mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (errors.fullName) {
                              setErrors((prev) => ({ ...prev, fullName: "" }));
                            }
                          }}
                          placeholder="e.g. Marie Laurent"
                          className={`w-full p-2.5 rounded-lg border outline-none transition-colors ${
                            errors.fullName
                              ? "border-red-400 bg-red-50/30 focus:border-red-500"
                              : "border-neutral-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                          }`}
                        />
                        {errors.fullName && (
                          <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 flex-shrink-0" />
                            <span>{errors.fullName}</span>
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="font-semibold text-neutral-700 block mb-1">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) {
                              setErrors((prev) => ({ ...prev, email: "" }));
                            }
                          }}
                          placeholder="e.g. marie.laurent@example.com"
                          className={`w-full p-2.5 rounded-lg border outline-none transition-colors ${
                            errors.email
                              ? "border-red-400 bg-red-50/30 focus:border-red-500"
                              : "border-neutral-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                          }`}
                        />
                        {errors.email ? (
                          <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 flex-shrink-0" />
                            <span>{errors.email}</span>
                          </p>
                        ) : (
                          <p className="text-[10px] text-neutral-400 mt-1">
                            Booking voucher and ticket barcodes are sent here.
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="font-semibold text-neutral-700 block mb-1">
                          Mobile / WhatsApp Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (errors.phone) {
                              setErrors((prev) => ({ ...prev, phone: "" }));
                            }
                          }}
                          placeholder="e.g. +33 6 12 34 56 78"
                          className={`w-full p-2.5 rounded-lg border outline-none transition-colors ${
                            errors.phone
                              ? "border-red-400 bg-red-50/30 focus:border-red-500"
                              : "border-neutral-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                          }`}
                        />
                        {errors.phone ? (
                          <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 flex-shrink-0" />
                            <span>{errors.phone}</span>
                          </p>
                        ) : (
                          <p className="text-[10px] text-neutral-400 mt-1">
                            For guide coordination and morning updates.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: Special Requirements & Additional Information (Optional) */}
                  <div className="border border-brand-primary/20 bg-brand-light/20 rounded-2xl p-4 sm:p-5 space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-lg bg-brand-primary text-white flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-neutral-900">
                            Special Requirements & Additional Information
                          </h4>
                          <span className="text-[11px] text-brand-dark font-medium">
                            Optional • Reviewed by our team prior to departure
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsSpecialReqExpanded(!isSpecialReqExpanded)}
                        className="text-neutral-500 hover:text-neutral-800 p-1 rounded-lg hover:bg-neutral-100 transition-colors"
                        aria-label="Toggle special requirements section"
                      >
                        {isSpecialReqExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-neutral-600 leading-relaxed">
                      We want your day to be effortless. Please tell us about any dietary needs, mobility preferences,
                      or special items you are bringing so our operations team can prepare beforehand.
                    </p>

                    {isSpecialReqExpanded && (
                      <div className="space-y-5 pt-3 border-t border-brand-primary/10 text-xs">
                        {/* 1. Dietary Restrictions & Allergies */}
                        <div className="space-y-2">
                          <label className="font-bold text-neutral-800 flex items-center space-x-1.5">
                            <Utensils className="w-3.5 h-3.5 text-brand-primary" />
                            <span>Food Allergies, Dietary Restrictions & Foods to Avoid</span>
                          </label>
                          <p className="text-[11px] text-neutral-500">
                            Do you or anyone in your party have food allergies or dietary preferences? (Select all that apply)
                          </p>

                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {DIETARY_OPTIONS.map((item) => {
                              const isSelected = selectedDietary.includes(item);
                              return (
                                <button
                                  key={item}
                                  type="button"
                                  onClick={() =>
                                    toggleSelection(
                                      selectedDietary,
                                      setSelectedDietary,
                                      item,
                                      "No Dietary Restrictions"
                                    )
                                  }
                                  className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                                    isSelected
                                      ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                                      : "bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400"
                                  }`}
                                >
                                  {isSelected && <Check className="w-3 h-3 inline mr-1 stroke-[3]" />}
                                  {item}
                                </button>
                              );
                            })}
                          </div>

                          <div className="pt-1.5">
                            <input
                              type="text"
                              value={dietaryNotes}
                              onChange={(e) => setDietaryNotes(e.target.value)}
                              placeholder="Any specific allergies or severity details? (e.g. Severe peanut allergy, carry EpiPen)"
                              className="w-full p-2.5 rounded-lg border border-neutral-300 bg-white outline-none focus:border-brand-primary text-xs"
                            />
                          </div>
                        </div>

                        {/* 2. Accessibility & Special Needs */}
                        <div className="space-y-2 pt-2 border-t border-neutral-200/70">
                          <label className="font-bold text-neutral-800 flex items-center space-x-1.5">
                            <Accessibility className="w-3.5 h-3.5 text-brand-primary" />
                            <span>Accessibility Accommodations & Special Needs</span>
                          </label>
                          <p className="text-[11px] text-neutral-500">
                            Do you have any mobility or access needs we should know about?
                          </p>

                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {ACCESSIBILITY_OPTIONS.map((item) => {
                              const isSelected = selectedAccessibility.includes(item);
                              return (
                                <button
                                  key={item}
                                  type="button"
                                  onClick={() =>
                                    toggleSelection(
                                      selectedAccessibility,
                                      setSelectedAccessibility,
                                      item,
                                      "No Special Needs"
                                    )
                                  }
                                  className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                                    isSelected
                                      ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                                      : "bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400"
                                  }`}
                                >
                                  {isSelected && <Check className="w-3 h-3 inline mr-1 stroke-[3]" />}
                                  {item}
                                </button>
                              );
                            })}
                          </div>

                          <div className="pt-1.5">
                            <input
                              type="text"
                              value={accessibilityNotes}
                              onChange={(e) => setAccessibilityNotes(e.target.value)}
                              placeholder="Specific accommodations (e.g. Needs step-free access, traveling with senior guest)"
                              className="w-full p-2.5 rounded-lg border border-neutral-300 bg-white outline-none focus:border-brand-primary text-xs"
                            />
                          </div>
                        </div>

                        {/* 3. Items to Bring & Preparation */}
                        <div className="space-y-2 pt-2 border-t border-neutral-200/70">
                          <label className="font-bold text-neutral-800 flex items-center space-x-1.5">
                            <Luggage className="w-3.5 h-3.5 text-brand-primary" />
                            <span>Items You Should Bring & Pre-Tour Preparation</span>
                          </label>

                          <div className="bg-white border border-neutral-200 rounded-xl p-3 text-[11px] text-neutral-600 space-y-1">
                            <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
                              <Info className="w-3.5 h-3.5 text-brand-primary" />
                              <span>Essential Preparation Checklist:</span>
                            </div>
                            <ul className="list-disc list-inside space-y-0.5 pl-1 text-neutral-600">
                              <li>Valid government photo ID or passport (strictly required at palace security).</li>
                              <li>Comfortable walking shoes (estate spans over 2,000 acres).</li>
                              <li>Weather-appropriate outer layer or compact umbrella.</li>
                            </ul>
                          </div>

                          <p className="text-[11px] text-neutral-500 pt-1">
                            Are you planning to bring any specific equipment or have preparation questions?
                          </p>

                          <div className="flex flex-wrap gap-1.5">
                            {PREPARATION_OPTIONS.map((item) => {
                              const isSelected = selectedPreparation.includes(item);
                              return (
                                <button
                                  key={item}
                                  type="button"
                                  onClick={() =>
                                    toggleSelection(
                                      selectedPreparation,
                                      setSelectedPreparation,
                                      item,
                                      "All Standard Gear (Nothing Special)"
                                    )
                                  }
                                  className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                                    isSelected
                                      ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                                      : "bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400"
                                  }`}
                                >
                                  {isSelected && <Check className="w-3 h-3 inline mr-1 stroke-[3]" />}
                                  {item}
                                </button>
                              );
                            })}
                          </div>

                          <div className="pt-1.5">
                            <input
                              type="text"
                              value={preparationNotes}
                              onChange={(e) => setPreparationNotes(e.target.value)}
                              placeholder="e.g. We have 2 carry-on suitcases after hotel checkout. Can we store them safely?"
                              className="w-full p-2.5 rounded-lg border border-neutral-300 bg-white outline-none focus:border-brand-primary text-xs"
                            />
                          </div>
                        </div>

                        {/* 4. Other Relevant Requests */}
                        <div className="space-y-2 pt-2 border-t border-neutral-200/70">
                          <label className="font-bold text-neutral-800 flex items-center space-x-1.5">
                            <MessageSquare className="w-3.5 h-3.5 text-brand-primary" />
                            <span>Other Relevant Information or Requests</span>
                          </label>
                          <textarea
                            rows={2}
                            value={otherRequests}
                            onChange={(e) => setOtherRequests(e.target.value)}
                            placeholder="e.g. Celebrating a 10th anniversary, language preference details, or emergency contact info..."
                            className="w-full p-2.5 rounded-lg border border-neutral-300 bg-white outline-none focus:border-brand-primary text-xs"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Reassurance Footer */}
                  <div className="flex items-center space-x-2 text-xs text-neutral-500 bg-neutral-50 p-3 rounded-xl border border-neutral-200">
                    <ShieldCheck className="w-4 h-4 text-brand-primary flex-shrink-0" />
                    <span>
                      Zero charge today. You can modify or cancel free of charge up to 24 hours before your tour departure.
                    </span>
                  </div>

                  {/* Form Submission Buttons */}
                  <div className="flex items-center justify-end space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-brand-primary hover:bg-brand-hover text-white text-xs font-extrabold rounded-xl shadow-md transition-all flex items-center space-x-2 active:scale-95"
                    >
                      <Sparkles className="w-4 h-4 fill-current" />
                      <span>Confirm & Hold Reservation</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              ) : (
                /* CONFIRMATION / TEAM REVIEW STATE */
                <div className="space-y-5 animate-fadeIn">
                  <div className="text-center space-y-2 py-2">
                    <div className="w-14 h-14 rounded-full bg-brand-light text-brand-primary flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <h3 className="text-xl font-extrabold text-neutral-900 font-display">
                      Reservation Held Successfully!
                    </h3>
                    <p className="text-xs text-neutral-500 max-w-md mx-auto">
                      Thank you, <span className="font-bold text-neutral-800">{lastBooking?.leadTraveler.fullName}</span>!
                      Your booking voucher has been provisionally registered.
                    </p>
                  </div>

                  {/* Team Review Alert Card */}
                  <div className="bg-brand-light/50 border border-brand-primary/20 rounded-xl p-4 text-xs text-brand-dark space-y-1">
                    <div className="flex items-center space-x-2 font-bold">
                      <ShieldCheck className="w-4 h-4 text-brand-primary flex-shrink-0" />
                      <span>Special Requirements Logged for Team Review</span>
                    </div>
                    <p className="text-neutral-700 leading-relaxed pl-6">
                      All your dietary preferences, accessibility needs, and pre-tour preparation requests have been
                      saved with your booking. Our operations and guide team will review them beforehand to ensure a seamless experience.
                    </p>
                  </div>

                  {/* Confirmed Details Breakdown */}
                  <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 sm:p-5 text-xs space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                      <div>
                        <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">
                          Booking Reference
                        </span>
                        <span className="block text-sm font-extrabold text-neutral-900 font-mono">
                          {lastBooking?.id}
                        </span>
                      </div>
                      <span className="px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-[11px] font-bold">
                        Confirmed & Held
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-neutral-700">
                      <div>
                        <span className="text-[10px] text-neutral-400 block">Experience</span>
                        <span className="font-bold text-neutral-900">{lastBooking?.tourTitle}</span>
                        <span className="block text-neutral-500 text-[11px]">{lastBooking?.packageTitle}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-400 block">Date & Time</span>
                        <span className="font-bold text-neutral-900">
                          {lastBooking?.departureDate} at {lastBooking?.departureTime}
                        </span>
                        <span className="block text-neutral-500 text-[11px]">
                          {lastBooking?.totalTravelers} {lastBooking?.totalTravelers === 1 ? "Traveler" : "Travelers"}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-400 block">Lead Guest Contact</span>
                        <span className="font-bold text-neutral-900">{lastBooking?.leadTraveler.fullName}</span>
                        <span className="block text-neutral-500 text-[11px]">
                          {lastBooking?.leadTraveler.email} • {lastBooking?.leadTraveler.phone}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-400 block">Payment Status</span>
                        <span className="font-bold text-neutral-900 font-display text-sm">
                          ${lastBooking?.totalPrice.toFixed(2)} USD
                        </span>
                        <span className="block text-brand-dark font-medium text-[11px]">
                          Pay $0.00 today (Reserve Now & Pay Later)
                        </span>
                      </div>
                    </div>

                    {/* Captured Special Requirements Summary for Review */}
                    <div className="pt-3 border-t border-neutral-200 space-y-2">
                      <span className="text-[11px] font-bold text-neutral-900 block">
                        Captured Customer Requirements for Team Review:
                      </span>

                      <div className="bg-white rounded-lg p-3 border border-neutral-200 space-y-2 text-[11px]">
                        <div>
                          <span className="font-semibold text-neutral-700">Dietary & Allergies: </span>
                          <span className="text-neutral-600">
                            {lastBooking?.specialRequirements.dietaryRestrictions.length
                              ? lastBooking.specialRequirements.dietaryRestrictions.join(", ")
                              : "None indicated"}
                            {lastBooking?.specialRequirements.otherDietaryOrAllergies &&
                              ` (${lastBooking.specialRequirements.otherDietaryOrAllergies})`}
                          </span>
                        </div>

                        <div>
                          <span className="font-semibold text-neutral-700">Accessibility & Mobility: </span>
                          <span className="text-neutral-600">
                            {lastBooking?.specialRequirements.accessibilityNeeds.length
                              ? lastBooking.specialRequirements.accessibilityNeeds.join(", ")
                              : "Standard mobility"}
                            {lastBooking?.specialRequirements.otherSpecialNeeds &&
                              ` (${lastBooking.specialRequirements.otherSpecialNeeds})`}
                          </span>
                        </div>

                        <div>
                          <span className="font-semibold text-neutral-700">Preparation & Items: </span>
                          <span className="text-neutral-600">
                            {lastBooking?.specialRequirements.itemsToBringOrPrepare.length
                              ? lastBooking.specialRequirements.itemsToBringOrPrepare.join(", ")
                              : "Standard equipment"}
                            {lastBooking?.specialRequirements.equipmentOrLuggageNotes &&
                              ` (${lastBooking.specialRequirements.equipmentOrLuggageNotes})`}
                          </span>
                        </div>

                        {lastBooking?.specialRequirements.otherRequests && (
                          <div>
                            <span className="font-semibold text-neutral-700">Special Notes: </span>
                            <span className="text-neutral-600">
                              {lastBooking.specialRequirements.otherRequests}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Pre-Tour What to Prepare */}
                  <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-3.5 text-xs text-amber-900 space-y-1">
                    <span className="font-bold block">What to prepare before attending:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-neutral-700 text-[11px]">
                      <li>Bring government-issued photo ID (or passport) for each traveler.</li>
                      <li>Arrive at the meeting point 15 minutes before departure.</li>
                      <li>Check your email inbox ({lastBooking?.leadTraveler.email}) for your digital voucher.</li>
                    </ul>
                  </div>

                  {/* Modal Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-xs font-semibold text-neutral-700 flex items-center justify-center space-x-1.5 transition-colors"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Summary</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="w-full sm:w-auto px-6 py-2.5 bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                    >
                      Done & Return to Tour
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
