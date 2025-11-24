import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface OptionCardProps {
  optionData: {
    title: string;
    description: string;
    link: string;
    linkTitle: string;
    enabled: boolean;
    icon: LucideIcon;
  };
}

function OptionCard({ optionData }: OptionCardProps) {
  const {
    title,
    description,
    link,
    linkTitle,
    enabled,
    icon: Icon,
  } = optionData;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-200">
      <div className="mb-4">
        <Icon className="w-16 h-16 text-blue-600" strokeWidth="1px" />
      </div>

      <h3 className="font-semibold text-lg text-gray-900 mb-2">{title}</h3>

      <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
        {description}
      </p>

      {enabled ? (
        <Link
          href={`/dashboard/inventory${link}/new`}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-center"
        >
          {linkTitle}
        </Link>
      ) : (
        <button
          disabled
          className="w-full bg-gray-300 text-gray-500 text-sm font-medium py-2.5 px-4 rounded-lg cursor-not-allowed"
        >
          Coming Soon
        </button>
      )}
    </div>
  );
}

export default OptionCard;
