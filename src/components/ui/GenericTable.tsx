import { useState, useEffect, useRef, type JSX } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  FilterFn,
} from "@tanstack/react-table";
import {
  Search,
  Filter,
  ChevronDown,
  X,
  ChevronsUpDown,
  ChevronUp,
} from "lucide-react";

declare module "@tanstack/react-table" {
  interface FilterFns {
    arrIncludesSome: FilterFn<unknown>;
  }
}

export type FilterOption = {
  label: string;
  value: string;
  count?: number;
};

export type FilterConfig<TData extends object> = {
  [K in keyof TData]?: FilterOption[];
};

type GenericTableProps<TData extends object> = {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  enableSearch?: boolean;
  searchPlaceholder?: string;
  enableFilter?: boolean;
  filterConfig?: FilterConfig<TData>;
  emptyMessage?: string;
  showResultCount?: boolean;
  enablePagination?: boolean;
  className?: string;
};

export default function GenericTable<TData extends object>({
  data,
  columns,
  enableSearch = false,
  searchPlaceholder = "Search...",
  enableFilter = false,
  filterConfig = {},
  emptyMessage = "No data available",
  showResultCount = false,
  enablePagination = false,
  className = "",
}: GenericTableProps<TData>): JSX.Element {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const filterButtonRef = useRef<HTMLDivElement>(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 7,
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isFilterOpen &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterOpen]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      columnFilters,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    filterFns: {
      arrIncludesSome: (row, columnId, filterValue) => {
        if (
          !filterValue ||
          !Array.isArray(filterValue) ||
          filterValue.length === 0
        )
          return true;
        const rowValue = row.getValue(columnId);
        return filterValue.some((val) =>
          String(rowValue).toLowerCase().includes(String(val).toLowerCase())
        );
      },
    },
  });

  const handleFilterChange = (
    columnId: string,
    value: string,
    checked: boolean
  ) => {
    setColumnFilters((prev) => {
      const newFilters = [...prev];
      let targetFilter = newFilters.find((f) => f.id === columnId);

      if (!targetFilter) {
        targetFilter = { id: columnId, value: [] };
        newFilters.push(targetFilter);
      }

      const currentValues = (targetFilter.value as string[]) || [];

      if (checked) {
        targetFilter.value = [...currentValues, value];
      } else {
        targetFilter.value = currentValues.filter((v) => v !== value);
      }

      if ((targetFilter.value as string[]).length === 0) {
        return newFilters.filter((f) => f.id !== columnId);
      }

      return newFilters;
    });
  };

  const getActiveFilterCount = () => {
    return columnFilters.reduce(
      (sum, f) => sum + (Array.isArray(f.value) ? f.value.length : 0),
      0
    );
  };

  const clearAllFilters = () => setColumnFilters([]);

  const clearFilter = (columnId: string) => {
    setColumnFilters((prev) => prev.filter((f) => f.id !== columnId));
  };

  const activeFiltersForDisplay = columnFilters.flatMap((filter) =>
    Array.isArray(filter.value)
      ? filter.value.map((val) => ({ columnId: filter.id, value: val }))
      : []
  );

  return (
    <div className={`space-y-4 ${className}`}>
      {(enableSearch || enableFilter) && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {enableSearch && (
            <div className="relative flex-1 max-w-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-400 dark:text-slate-500" />
              </div>
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="block w-full rounded-lg border-0 py-2.5 pl-10 pr-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-slate-900 dark:focus:ring-blue-500 sm:text-sm transition-colors"
              />
            </div>
          )}

          {enableFilter && (
            <div ref={filterButtonRef} className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
              >
                <Filter className="h-4 w-4" /> Filter
                {getActiveFilterCount() > 0 && (
                  <span className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 dark:bg-blue-500 text-xs text-white dark:text-white">
                    {getActiveFilterCount()}
                  </span>
                )}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isFilterOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isFilterOpen && (
                <div className="absolute right-0 z-10 mt-2 w-80 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-slate-100">
                      Filters
                    </h3>
                    {getActiveFilterCount() > 0 && (
                      <button
                        onClick={clearAllFilters}
                        className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                  <div className="space-y-4 max-h-64 overflow-y-auto">
                    {table
                      .getAllLeafColumns()
                      .filter(
                        (c) =>
                          c.columnDef.enableColumnFilter &&
                          filterConfig[c.id as keyof TData]
                      )
                      .map((column) => {
                        const options =
                          filterConfig[column.id as keyof TData] || [];
                        const activeValues =
                          (column.getFilterValue() as string[]) || [];
                        return (
                          <div key={column.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="text-xs font-medium text-gray-700 dark:text-slate-300">
                                {String(column.columnDef.header)}
                              </label>
                              {activeValues.length > 0 && (
                                <button
                                  onClick={() => clearFilter(column.id)}
                                  className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                                >
                                  Clear
                                </button>
                              )}
                            </div>
                            <div className="space-y-1">
                              {options.map((option) => (
                                <label
                                  key={option.value}
                                  className="flex items-center space-x-2 text-xs text-gray-700 dark:text-slate-300"
                                >
                                  <input
                                    type="checkbox"
                                    checked={activeValues.includes(
                                      option.value
                                    )}
                                    onChange={(e) =>
                                      handleFilterChange(
                                        column.id,
                                        option.value,
                                        e.target.checked
                                      )
                                    }
                                    className="h-3 w-3 rounded border-gray-300 dark:border-slate-600 text-slate-900 dark:text-blue-500 focus:ring-slate-900 dark:focus:ring-blue-500 dark:bg-slate-700"
                                  />
                                  <span className="flex-1">{option.label}</span>
                                  {option.count !== undefined && (
                                    <span className="text-gray-500 dark:text-slate-400">
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
          )}
        </div>
      )}

      {activeFiltersForDisplay.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-slate-400">
            Active filters:
          </span>
          {activeFiltersForDisplay.map(({ columnId, value }) => {
            const column = table.getColumn(columnId);
            return (
              <span
                key={`${columnId}-${value}`}
                className="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-700 px-2 py-1 text-xs text-slate-800 dark:text-slate-200"
              >
                <span className="font-medium">
                  {String(column?.columnDef.header)}:
                </span>
                {value}
                <button
                  onClick={() => handleFilterChange(columnId, value, false)}
                  className="ml-1 hover:text-slate-600 dark:hover:text-slate-100"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            );
          })}
        </div>
      )}

      {showResultCount && (
        <div className="text-sm text-gray-500 dark:text-slate-400">
          Showing {table.getRowModel().rows.length} of {data.length} results
        </div>
      )}

      {/* --- TABLE --- */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <table className="min-w-full divide-y-2 divide-gray-200 dark:divide-slate-700 text-sm">
          <thead className="bg-gray-50 dark:bg-slate-700/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? "flex items-center gap-2 cursor-pointer select-none"
                            : "flex items-center gap-2"
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <ChevronUp className="h-4 w-4" />,
                          desc: <ChevronDown className="h-4 w-4" />,
                        }[header.column.getIsSorted() as string] ??
                          (header.column.getCanSort() ? (
                            <ChevronsUpDown className="h-4 w-4 text-gray-400 opacity-50" />
                          ) : null)}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
            {table.getRowModel().rows.length > 0 ? (
              (enablePagination
                ? table.getPaginationRowModel().rows
                : table.getRowModel().rows
              ).map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="whitespace-nowrap px-4 py-4 text-sm text-gray-900 dark:text-slate-200"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-sm text-gray-500 dark:text-slate-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {enablePagination && (
        <div className="flex items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex-1 text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-2 py-1 rounded border disabled:opacity-50"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              First
            </button>
            <button
              className="px-2 py-1 rounded border disabled:opacity-50"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </button>
            <button
              className="px-2 py-1 rounded border disabled:opacity-50"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
            <button
              className="px-2 py-1 rounded border disabled:opacity-50"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              Last
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
