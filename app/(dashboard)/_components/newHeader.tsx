import BackButton from "@/components/BackButton";
import React from "react";

interface NewHeaderProps {
  title: string;
  description?: string;
  className?: string;
  link?: string;
}

function NewHeader({
  title,
  description,
  className = "",
  link,
}: NewHeaderProps) {
  return (
    <header className={`bg-white border-b border-gray-200 ${className}`}>
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          <div className="flex flex-col space-y-1">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              {title}
            </h1>
            {description && (
              <p className="text-sm text-gray-600 max-w-2xl">{description}</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Additional header actions can be added here */}
            <BackButton />
          </div>
        </div>
      </div>
    </header>
  );
}

export default NewHeader;
