"use client";
import React, { useState } from "react";

interface WorkExperienceProps {
  company: string;
  position: string;
  description: React.ReactNode[];
  logo?: string;
  website?: string;
}

interface LinkWithTooltipProps {
  href: string;
  text: string;
  description?: string;
}

interface CompanyLogoProps {
  src: string;
  alt: string;
  href: string;
  zIndex: number;
}

// Reusable link component with tooltip
const LinkWithTooltip: React.FC<LinkWithTooltipProps> = ({
  href,
  text,
  description,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span className="relative inline-block">
      <a
        href={href}
        className="text-[var(--muted-foreground)] text-sm underline decoration-[1px] underline-offset-3 decoration-[var(--muted-foreground)] cursor-pointer group inline-flex items-center"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {text}
        <svg
          className="w-3 h-3 ml-0.5 inline-block"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </a>

      {description && isHovered && (
        <div className="absolute z-10 left-0 -bottom-24 w-64 p-3 shadow-lg bg-[var(--tooltip)] border border-[var(--tooltip-border)] rounded text-sm text-[var(--tooltip-foreground)]">
          {description}
          <div className="absolute -top-2 left-3 w-4 h-4 bg-[var(--tooltip)] border-t border-l border-[var(--tooltip-border)] transform rotate-45"></div>
        </div>
      )}
    </span>
  );
};

// Company logo component with website link and hover effect
const CompanyLogo: React.FC<CompanyLogoProps> = ({
  src,
  alt,
  href,
  zIndex,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative w-12 h-12 rounded-full border-2 border-[var(--background)] overflow-hidden ${
        zIndex < 40 ? "-ml-4" : ""
      } z-${zIndex} transition-transform duration-200 hover:scale-110`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={src} alt={alt} className="w-full h-full object-contain" />
      {isHovered && (
        <div className="absolute z-50 left-1/2 -translate-x-1/2 -bottom-8 whitespace-nowrap px-2 py-1 text-xs bg-[var(--tooltip)] text-[var(--tooltip-foreground)] rounded shadow-lg">
          {alt.replace(" logo", "")}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--tooltip)] transform rotate-45"></div>
        </div>
      )}
    </a>
  );
};

// Work experience item component
const WorkExperienceItem: React.FC<WorkExperienceProps> = ({
  company,
  position,
  description,
  logo,
  website,
}) => {
  // Get the first character for the logo placeholder
  const getLogoPlaceholder = () => {
    if (company === "Topview") return "To";
    if (company === "通联支付网络股份有限公司") return "通联";
    return company.slice(0, 2);
  };

  return (
    <div className="mb-8">
      <div className="flex items-start">
        <div className="w-10 h-10 mr-4 flex-shrink-0">
          {website ? (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full"
            >
              <div className="w-full h-full rounded-full flex items-center justify-center bg-[var(--accent)] text-[var(--foreground)] text-xs font-medium">
                {getLogoPlaceholder()}
              </div>
            </a>
          ) : (
            <div className="w-full h-full rounded-full flex items-center justify-center bg-[var(--accent)] text-[var(--foreground)] text-xs font-medium">
              {getLogoPlaceholder()}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-base font-medium text-[var(--foreground)]">
            {website ? (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {company}
              </a>
            ) : (
              company
            )}
          </h3>
          <p className="text-sm text-[var(--muted-foreground)] mb-4">
            {position}
          </p>
          <ul className="text-sm text-[var(--foreground)] list-disc pl-4 marker:text-[var(--muted-foreground)]">
            {description.map((item, index) => (
              <li key={index} className="mb-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Work: React.FC = () => {
  // Work experience data structured in an array
  const workExperiences = [
    {
      company: "Topview",
      position: "产品设计师",
      logo: "/companies/topview.png",
      website: "https://www.topview.com/",
      description: [
        "负责核心产品的用户体验设计",
        "主导产品原型设计和交互设计",
        "参与用户研究和产品策略制定",
      ],
    },
    {
      company: "通联支付网络股份有限公司",
      position: "产品设计师",
      logo: "/companies/allinpay.png",
      website: "https://www.allinpay.com/",
      description: [
        "负责公司内部系统的产品设计工作",
        "参与用户研究，设计系统交互和视觉体验",
        "优化产品流程，提升用户体验",
      ],
    },
  ];

  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)]">work</h1>
      <div className="max-w-2xl">
        {workExperiences.map((work, index) => (
          <WorkExperienceItem
            key={index}
            company={work.company}
            position={work.position}
            logo={work.logo}
            website={work.website}
            description={work.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Work;
