"use client";

import React, { useState, useId } from "react";
import { PackageOption } from "@/types/tour";
import {
  Calendar as CalendarIcon,
  Users,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronDown,
  X,
  CreditCard,
} from "lucide-react";

interface BookingWidgetProps {
  packageOptions: PackageOption[];
  basePrice: number;
  tourTitle: string;
}

export function BookingWidget({ packageOptions, basePrice, tourTitle }: BookingWidgetProps) {
  const datePickerId = useId();
  const [selectedDate, setSelectedDate] = useState<string>("2026-11-25");
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string>(packageOptions[0].id);

  // Popover toggles
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTravelerPicker, setShowTravelerPicker] = useState<boolean>(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  const activeOption =
    packageOptions.find((opt) => opt.id === selectedOptionId) || packageOptions[0];

  // Dynamic price calculation
  const totalTravelers = adults + children;
  const adultTotal = adults * activeOption.price;
  const childTotal = children * (activeOption.price * 0.75); // 25% discount for children
  const totalPrice = adultTotal + childTotal;

  const handleReserve = () => {
    setBookingConfirmed(true);
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 shadow-sidebar sticky top-28 space-y-5">
      {/* Price Header */}
      <div className="pb-4 border-b border-neutral-200">
        <div className="flex items-baseline justify-between flex-wrap gap-2">
          <div>
            <span className="text-xs text-neutral-500 block leading-tight">From</span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                ${activeOption.price.toFixed(2)}
              </span>
              <span className="text-xs text-neutral-500">per adult</span>
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
                  { label: "Tomorrow", date: "2026-11-20" },
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
          <span className="text-xl text-brand-dark font-extrabold">${totalPrice.toFixed(2)}</span>
        </div>
        <p className="text-[10px] text-neutral-500 text-right">Taxes and all booking fees included</p>
      </div>

      {/* Main Call to Action Button */}
      <button
        type="button"
        onClick={handleReserve}
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

      {/* Reservation Confirmation Modal */}
      {bookingConfirmed && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-brand-light text-brand-primary flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold text-neutral-900">Reservation Held!</h3>
              <p className="text-xs text-neutral-500 mt-1">
                Your spot for <span className="font-bold text-neutral-800">{tourTitle}</span> has been provisionally reserved.
              </p>
            </div>

            <div className="bg-neutral-50 rounded-xl p-4 space-y-2 text-xs text-neutral-700">
              <div className="flex justify-between">
                <span className="text-neutral-500">Selected Option:</span>
                <span className="font-bold text-right truncate max-w-[200px]">{activeOption.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Date:</span>
                <span className="font-bold">{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Guests:</span>
                <span className="font-bold">{totalTravelers} travelers</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-neutral-200 text-sm font-extrabold text-neutral-900">
                <span>Total Due:</span>
                <span className="text-brand-dark">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setBookingConfirmed(false)}
              className="w-full py-2.5 bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold rounded-xl transition-colors"
            >
              Close & Continue Browsing
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
