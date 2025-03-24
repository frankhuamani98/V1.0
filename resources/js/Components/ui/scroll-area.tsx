// components/ui/scroll-area.tsx
import * as React from "react";

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  maxHeight?: string;
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, maxHeight = "400px", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative overflow-hidden ${className || ""}`}
        style={{ maxHeight }}
        {...props}
      >
        <div className="h-full overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {children}
        </div>
      </div>
    );
  }
);

ScrollArea.displayName = "ScrollArea";

interface ScrollBarProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal";
}

const ScrollBar = React.forwardRef<HTMLDivElement, ScrollBarProps>(
  ({ className, orientation = "vertical", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`absolute ${
          orientation === "vertical"
            ? "right-0 top-0 h-full w-2"
            : "bottom-0 left-0 h-2 w-full"
        } ${className || ""}`}
        {...props}
      />
    );
  }
);

ScrollBar.displayName = "ScrollBar";

const ScrollAreaViewport = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`h-full w-full rounded-[inherit] ${className || ""}`}
      {...props}
    >
      {children}
    </div>
  );
});

ScrollAreaViewport.displayName = "ScrollAreaViewport";

export { ScrollArea, ScrollAreaViewport, ScrollBar };