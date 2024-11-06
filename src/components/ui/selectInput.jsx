"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const SelectInput = React.forwardRef(
  ({ className, options, placeholder, ...props }, ref) => {
    const [selected, setSelected] = useState("");

    const handleChange = (event) => {
      setSelected(event.target.value);
      if (props.onChange) props.onChange(event); // Call external onChange if it exists
    };

    return (
      <div className="p-[2px] rounded-lg transition duration-300 group/input">
        <select
          className={cn(
            `flex h-10 w-full border-none bg-white dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm placeholder:text-neutral-700 dark:placeholder:text-text-white/[0.5] focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] transition duration-400`,
            className
          )}
          ref={ref}
          {...props}
          onChange={handleChange}
          value={selected}
        >
          {placeholder && (
            <option
              className={cn(
                selected === "" ? "text-neutral-700 dark:text-white/[0.5]" : "",
                "text-neutral-700 dark:text-white/[0.5]"
              )}
              value=""
              disabled
              hidden
            >
              {placeholder}
            </option>
          )}
          {options.map((option, index) => (
            <option
              key={index}
              value={option.value}
              className="text-black dark:text-white"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);
SelectInput.displayName = "SelectInput";
export { SelectInput };
