import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

type Crumb = {
  name: string;
  href: string;
};

interface BreadcrumbsProps {
  crumbs: Crumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ crumbs }) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.name} className="flex items-center">
              {!isLast ? (
                <Link
                  to={crumb.href}
                  className="text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  {crumb.name}
                </Link>
              ) : (
                <span className="font-semibold text-slate-800 dark:text-slate-100">
                  {crumb.name}
                </span>
              )}

              {!isLast && (
                <ChevronRight className="h-4 w-4 text-slate-400 mx-2" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
