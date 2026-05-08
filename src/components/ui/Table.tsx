import React from "react";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}
interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {}
interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}
interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {}
interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}
interface TableHeadCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}
interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className = "", ...props }, ref) => (
    <div className="w-full overflow-auto">
      <table
        ref={ref}
        className={`w-full caption-bottom text-sm ${className}`}
        {...props}
      />
    </div>
  ),
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ className = "", ...props }, ref) => (
    <thead
      ref={ref}
      className={`border-b border-border bg-muted/50 [&_tr]:border-b [&_tr]:border-border ${className}`}
      {...props}
    />
  ),
);
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className = "", ...props }, ref) => (
    <tbody
      ref={ref}
      className={`[&_tr:last-child]:border-0 ${className}`}
      {...props}
    />
  ),
);
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className = "", ...props }, ref) => (
    <tfoot
      ref={ref}
      className={`border-t border-border bg-muted/50 font-medium [&>tr]:last:border-b-0 ${className}`}
      {...props}
    />
  ),
);
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className = "", ...props }, ref) => (
    <tr
      ref={ref}
      className={`border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className}`}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadCellProps>(
  ({ className = "", ...props }, ref) => (
    <th
      ref={ref}
      className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}
      {...props}
    />
  ),
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className = "", ...props }, ref) => (
    <td
      ref={ref}
      className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}
      {...props}
    />
  ),
);
TableCell.displayName = "TableCell";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
};
