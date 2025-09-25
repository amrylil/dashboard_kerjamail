import React, { useState, useMemo } from "react";
// Menggunakan SVG inline untuk ikon agar tidak perlu instalasi library tambahan
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 text-gray-400"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);
const FilterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);
const ChevronDownIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);
const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-3 w-3"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export type ColumnDef<T> = {
  header: string;
  accessorKey: keyof T;
  cell?: (row: T) => React.ReactNode;
  filterable?: boolean;
  searchable?: boolean;
};

export type FilterOption = {
  label: string;
  value: string;
  count?: number;
};

export type FilterConfig<T> = {
  [K in keyof T]?: FilterOption[];
};

type GenericTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  enableSearch?: boolean;
  searchPlaceholder?: string;
  searchableColumns?: (keyof T)[];
  enableFilter?: boolean;
  filterConfig?: FilterConfig<T>;
  emptyMessage?: any;
  showResultCount?: boolean;
  className?: string;
};

const GenericTable = <T extends { id: string | number }>({
  data,
  columns,
  enableSearch = false,
  searchPlaceholder = "Search...",
  searchableColumns,
  enableFilter = false,
  filterConfig,
  emptyMessage = "No data available",
  showResultCount = false,
  className = "",
}: GenericTableProps<T>) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>(
    {}
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const getSearchableColumns = (): (keyof T)[] => {
    if (searchableColumns) return searchableColumns;
    return columns
      .filter((col) => col.searchable !== false)
      .map((col) => col.accessorKey);
  };

  const filteredData = useMemo(() => {
    let result = [...data];

    if (enableSearch && searchQuery.trim()) {
      const searchableKeys = getSearchableColumns();
      result = result.filter((item) =>
        searchableKeys.some((key) => {
          const value = item[key];
          if (value === null || value === undefined) return false;
          return String(value)
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        })
      );
    }

    if (enableFilter && Object.keys(activeFilters).length > 0) {
      result = result.filter((item) => {
        return Object.entries(activeFilters).every(
          ([columnKey, filterValues]) => {
            if (filterValues.length === 0) return true;
            const itemValue = String(item[columnKey as keyof T]).toLowerCase();
            return filterValues.some((filterValue) =>
              itemValue.includes(filterValue.toLowerCase())
            );
          }
        );
      });
    }

    return result;
  }, [data, searchQuery, activeFilters, enableSearch, enableFilter]);

  // Handle filter change
  const handleFilterChange = (
    columnKey: string,
    value: string,
    checked: boolean
  ) => {
    setActiveFilters((prev) => {
      const current = prev[columnKey] || [];
      if (checked) {
        return { ...prev, [columnKey]: [...current, value] };
      } else {
        return { ...prev, [columnKey]: current.filter((v) => v !== value) };
      }
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters({});
  };

  // Clear specific filter
  const clearFilter = (columnKey: string) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[columnKey];
      return newFilters;
    });
  };

  // Get active filter count
  const getActiveFilterCount = () => {
    return Object.values(activeFilters).reduce(
      (sum, filters) => sum + filters.length,
      0
    );
  };

  // Get filterable columns
  const filterableColumns = columns.filter(
    (col) => col.filterable !== false && filterConfig?.[col.accessorKey]
  );

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search and Filter Controls */}
      {(enableSearch || enableFilter) && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          {enableSearch && (
            <div className="relative flex-1 max-w-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-lg border-0 py-2.5 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-900 sm:text-sm transition-colors"
              />
            </div>
          )}

          {/* Filter */}
          {enableFilter && filterableColumns.length > 0 && (
            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
                >
                  <FilterIcon />
                  Filter
                  {getActiveFilterCount() > 0 && (
                    <span className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-xs text-white">
                      {getActiveFilterCount()}
                    </span>
                  )}
                  <ChevronDownIcon isOpen={isFilterOpen} />
                </button>

                {/* Filter Dropdown */}
                {isFilterOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-900">
                        Filters
                      </h3>
                      {getActiveFilterCount() > 0 && (
                        <button
                          onClick={clearAllFilters}
                          className="text-xs text-slate-600 hover:text-slate-900"
                        >
                          Clear all
                        </button>
                      )}
                    </div>

                    <div className="space-y-4 max-h-64 overflow-y-auto">
                      {filterableColumns.map((column) => {
                        const options =
                          filterConfig?.[column.accessorKey] || [];
                        const activeValues =
                          activeFilters[String(column.accessorKey)] || [];

                        return (
                          <div
                            key={String(column.accessorKey)}
                            className="space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <label className="text-xs font-medium text-gray-700">
                                {column.header}
                              </label>
                              {activeValues.length > 0 && (
                                <button
                                  onClick={() =>
                                    clearFilter(String(column.accessorKey))
                                  }
                                  className="text-xs text-slate-600 hover:text-slate-900"
                                >
                                  Clear
                                </button>
                              )}
                            </div>
                            <div className="space-y-1">
                              {options.map((option) => (
                                <label
                                  key={option.value}
                                  className="flex items-center space-x-2 text-xs"
                                >
                                  <input
                                    type="checkbox"
                                    checked={activeValues.includes(
                                      option.value
                                    )}
                                    onChange={(e) =>
                                      handleFilterChange(
                                        String(column.accessorKey),
                                        option.value,
                                        e.target.checked
                                      )
                                    }
                                    className="h-3 w-3 rounded border-gray-300 text-slate-900 focus:ring-slate-900"
                                  />
                                  <span className="flex-1">{option.label}</span>
                                  {option.count !== undefined && (
                                    <span className="text-gray-500">
                                      ({option.count})
                                    </span>
                                  )}
                                </label>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Active Filters Display */}
      {enableFilter && Object.keys(activeFilters).length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-500">Active filters:</span>
          {Object.entries(activeFilters).map(([columnKey, values]) =>
            values.map((value) => {
              const column = columns.find(
                (col) => String(col.accessorKey) === columnKey
              );
              return (
                <span
                  key={`${columnKey}-${value}`}
                  className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-800"
                >
                  <span className="font-medium">{column?.header}:</span>
                  {value}
                  <button
                    onClick={() => handleFilterChange(columnKey, value, false)}
                    className="ml-1 hover:text-slate-600"
                  >
                    <XIcon />
                  </button>
                </span>
              );
            })
          )}
        </div>
      )}

      {/* Results Count */}
      {showResultCount && (
        <div className="text-sm text-gray-500">
          Showing {filteredData.length} of {data.length} results
          {(searchQuery || Object.keys(activeFilters).length > 0) && (
            <span className="ml-1">
              {searchQuery && `for "${searchQuery}"`}
            </span>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.header}
                  className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <tr
                  key={row.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                  }`}
                >
                  {columns.map((column) => (
                    <td
                      key={`${row.id}-${String(column.accessorKey)}`}
                      className="whitespace-nowrap px-4 py-4 text-sm text-gray-900"
                    >
                      {column.cell
                        ? column.cell(row)
                        : (row[column.accessorKey] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-sm text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Click outside to close filter */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsFilterOpen(false)}
        />
      )}
    </div>
  );
};

export default GenericTable;
