import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-2.5 text-xs text-neutral-600">
      <ol className="flex items-center space-x-1.5 flex-wrap gap-y-1">
        <li className="flex items-center">
          <Link
            href="/"
            className="hover:text-brand-primary flex items-center transition-colors text-neutral-500 hover:underline"
          >
            <Home className="w-3.5 h-3.5 mr-1 text-neutral-400" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <li className="text-neutral-400 flex items-center">
                <ChevronRight className="w-3 h-3 flex-shrink-0" />
              </li>
              <li className="flex items-center min-w-0">
                {isLast || !item.href ? (
                  <span
                    className="font-semibold text-neutral-900 truncate max-w-[200px] sm:max-w-sm md:max-w-md inline-block"
                    aria-current="page"
                    title={item.label}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-brand-primary text-neutral-500 transition-colors truncate max-w-[140px] sm:max-w-none inline-block hover:underline"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
