"use client";

import { MessageCircle } from "lucide-react";
import { COMPANY_WHATSAPP } from "@/constants";

export function FloatingContact() {
  return (
    <a
      href={`https://wa.me/${COMPANY_WHATSAPP}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-5 bottom-20 z-[var(--z-index-fixed)] flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:right-6 sm:bottom-24 sm:size-14"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="size-5 sm:size-6" strokeWidth={1.75} />
    </a>
  );
}
