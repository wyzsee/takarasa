import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "w-full inline-flex h-10 items-center justify-center rounded-md",
      className
    )}
    {...props} />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "w-full text-brand-primary50 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-base font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:text-grey-10",
      className
    )}
    {...props}
  >
    <span
      className={cn(
        "relative",
        "data-[state=active]:after:content-['']",
        "data-[state=active]:after:absolute",
        "data-[state=active]:after:bottom-0",
        "data-[state=active]:after:left-1/2", 
        "data-[state=active]:after:-translate-x-1/2",
        "data-[state=active]:after:w-[80%]",
        "data-[state=active]:after:h-[4px]",
        "data-[state=active]:after:bg-grey-10"
      )}
    >
      {children}
    </span>
  </TabsPrimitive.Trigger>
))

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
      className
    )}
    {...props} />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
