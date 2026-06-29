"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EnquirySuccessProps {
  onClose: () => void;
}

export function EnquirySuccess({ onClose }: EnquirySuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="builder-enquiry-success depth-panel mt-6 p-8 text-center sm:p-10"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="bg-accent/15 mx-auto flex size-16 items-center justify-center rounded-full"
      >
        <Check className="text-accent size-8" strokeWidth={2.5} aria-hidden />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.4 }}
        className="type-heading-md text-foreground mt-6 font-medium"
      >
        Enquiry Submitted Successfully
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24, duration: 0.4 }}
        className="type-body-md text-foreground-muted mx-auto mt-3 max-w-md"
      >
        We&apos;ve received your website configuration. Our team will contact
        you shortly.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32, duration: 0.4 }}
        className="mt-8 flex justify-center"
      >
        <Button type="button" variant="primary" onClick={onClose}>
          Continue Browsing
        </Button>
      </motion.div>
    </motion.div>
  );
}
