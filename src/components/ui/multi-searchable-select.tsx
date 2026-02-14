import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { CiSearch } from "react-icons/ci";
import { Checkbox } from "./checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "@/lib/utils";

interface MultiSearchableSelectProps {
  values: string[];
  onValuesChange: (values: string[]) => void;
  children: React.ReactNode;
}

interface MultiSearchableSelectContextValue {
  values: string[];
  toggle: (value: string) => void;
  search: string;
  setSearch: (search: string) => void;
  onSearchChange?: (search: string) => void;
}

const MultiSearchableSelectContext =
  React.createContext<MultiSearchableSelectContextValue>({
    values: [],
    toggle: () => {},
    search: "",
    setSearch: () => {},
  });

function MultiSearchableSelect({
  values,
  onValuesChange,
  children,
}: MultiSearchableSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const toggle = React.useCallback(
    (value: string) => {
      onValuesChange(
        values.includes(value)
          ? values.filter((v) => v !== value)
          : [...values, value]
      );
    },
    [values, onValuesChange]
  );

  return (
    <MultiSearchableSelectContext.Provider
      value={{ values, toggle, search, setSearch }}
    >
      <Popover open={open} onOpenChange={setOpen}>
        {children}
      </Popover>
    </MultiSearchableSelectContext.Provider>
  );
}

function MultiSearchableSelectTrigger({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <PopoverTrigger asChild>
      <button
        type="button"
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm transition-[color,box-shadow] outline-none",
          className
        )}
      >
        {children}
        <ChevronDownIcon className="size-4 opacity-50 shrink-0" />
      </button>
    </PopoverTrigger>
  );
}

function MultiSearchableSelectValue({
  placeholder,
  getLabel,
}: {
  placeholder?: string;
  getLabel?: (value: string) => string;
}) {
  const { values } = React.useContext(MultiSearchableSelectContext);

  if (values.length === 0) {
    return (
      <span className="text-muted-foreground text-sm">{placeholder}</span>
    );
  }

  if (getLabel) {
    const labels = values.map(getLabel).filter(Boolean);
    if (labels.length <= 2) {
      return <span className="text-sm truncate">{labels.join(", ")}</span>;
    }
    return (
      <span className="text-sm truncate">
        {labels[0]}, {labels[1]} +{labels.length - 2}
      </span>
    );
  }

  return (
    <span className="text-sm">{values.length} selected</span>
  );
}

interface MultiSearchableSelectContentProps {
  className?: string;
  children: React.ReactNode;
  onSearchChange?: (search: string) => void;
  searchPlaceholder?: string;
}

function MultiSearchableSelectContent({
  className,
  children,
  onSearchChange,
  searchPlaceholder = "Поиск...",
}: MultiSearchableSelectContentProps) {
  const { search, setSearch } = React.useContext(MultiSearchableSelectContext);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearchChange?.(value);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PopoverContent
      className={cn("p-0 w-[var(--radix-popover-trigger-width)]", className)}
      align="start"
      sideOffset={4}
      onOpenAutoFocus={(e) => e.preventDefault()}
    >
      <div className="flex items-center border-b px-3 py-2">
        <CiSearch className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <input
          ref={inputRef}
          className="flex h-8 w-full rounded-md bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          placeholder={searchPlaceholder}
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <div className="max-h-[300px] overflow-y-auto p-1">{children}</div>
    </PopoverContent>
  );
}

function MultiSearchableSelectGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="py-1">{children}</div>;
}

function MultiSearchableSelectItem({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { values, toggle } = React.useContext(MultiSearchableSelectContext);
  const checked = values.includes(value);

  return (
    <div
      className={cn(
        "relative flex items-center gap-2 rounded-sm py-1.5 px-2 text-sm cursor-pointer select-none hover:bg-accent hover:text-accent-foreground",
        className
      )}
      onClick={() => toggle(value)}
    >
      <Checkbox
        checked={checked}
        className="size-4 pointer-events-none"
        tabIndex={-1}
      />
      <span>{children}</span>
    </div>
  );
}

export {
  MultiSearchableSelect,
  MultiSearchableSelectTrigger,
  MultiSearchableSelectValue,
  MultiSearchableSelectContent,
  MultiSearchableSelectGroup,
  MultiSearchableSelectItem,
};
