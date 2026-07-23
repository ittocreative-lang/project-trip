"use client"

import * as React from "react"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from "react-day-picker"

import { cn } from "@/lib/utils"
import {
  Button,
  buttonVariants,
} from "@/components/ui/button"

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "lucide-react"


function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<
    typeof Button
  >["variant"]
}) {
  const defaultClassNames =
    getDefaultClassNames()


  return (
    <DayPicker
      showOutsideDays={showOutsideDays}

      className={cn(
        "group/calendar bg-background p-2 [--cell-size:--spacing(7)]",
        className
      )}

      captionLayout={captionLayout}

      locale={locale}

      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(
            locale?.code,
            {
              month: "short",
            }
          ),

        ...formatters,
      }}


      classNames={{
        root: cn(
          "w-fit",
          defaultClassNames.root
        ),


        months: cn(
          "flex flex-col gap-4 md:flex-row",
          defaultClassNames.months
        ),


        month: cn(
          "space-y-4",
          defaultClassNames.month
        ),


        month_caption: cn(
          "flex h-8 items-center justify-center",
          defaultClassNames.month_caption
        ),


        caption_label: cn(
          "text-sm font-medium",
          defaultClassNames.caption_label
        ),


        nav: cn(
          "flex items-center justify-between",
          defaultClassNames.nav
        ),


        button_previous: cn(
          buttonVariants({
            variant: buttonVariant,
          }),

          "size-8 p-0",

          defaultClassNames.button_previous
        ),


        button_next: cn(
          buttonVariants({
            variant: buttonVariant,
          }),

          "size-8 p-0",

          defaultClassNames.button_next
        ),


        dropdowns: cn(
          "flex items-center justify-center gap-2",
          defaultClassNames.dropdowns
        ),


        dropdown_root: cn(
          "relative",
          defaultClassNames.dropdown_root
        ),


        dropdown: cn(
          "absolute inset-0 opacity-0",
          defaultClassNames.dropdown
        ),


        weekdays: cn(
          "flex",
          defaultClassNames.weekdays
        ),


        weekday: cn(
          "flex-1 text-center text-xs text-muted-foreground",
          defaultClassNames.weekday
        ),


        week: cn(
          "mt-2 flex w-full",
          defaultClassNames.week
        ),


        day: cn(
          "relative aspect-square w-full p-0 text-center",
          defaultClassNames.day
        ),


        today: cn(
          "rounded-md bg-muted",
          defaultClassNames.today
        ),


        outside: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.outside
        ),


        disabled: cn(
          "opacity-50",
          defaultClassNames.disabled
        ),


        hidden: cn(
          "invisible",
          defaultClassNames.hidden
        ),


        range_start: cn(
          defaultClassNames.range_start
        ),


        range_middle: cn(
          defaultClassNames.range_middle
        ),


        range_end: cn(
          defaultClassNames.range_end
        ),


        week_number: cn(
          defaultClassNames.week_number
        ),


        week_number_header: cn(
          defaultClassNames.week_number_header
        ),


        ...classNames,
      }}


      components={{
        Root: ({
          className,
          rootRef,
          ...props
        }) => (
          <div
            data-slot="calendar"
            ref={rootRef}
            className={cn(className)}
            {...props}
          />
        ),


        Chevron: ({
          className,
          orientation,
          ...props
        }) => {

          if (
            orientation === "left"
          ) {
            return (
              <ChevronLeftIcon
                className={cn(
                  "size-4",
                  className
                )}
                {...props}
              />
            )
          }


          if (
            orientation === "right"
          ) {
            return (
              <ChevronRightIcon
                className={cn(
                  "size-4",
                  className
                )}
                {...props}
              />
            )
          }


          return (
            <ChevronDownIcon
              className={cn(
                "size-4",
                className
              )}
              {...props}
            />
          )
        },


        DayButton: ({
          ...props
        }) => (
          <CalendarDayButton
            locale={locale}
            {...props}
          />
        ),


        WeekNumber: ({
          children,
          ...props
        }) => (
          <td {...props}>
            <div className="flex size-7 items-center justify-center text-xs">
              {children}
            </div>
          </td>
        ),


        ...components,
      }}


      {...props}
    />
  )
}



function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & {
  locale?: Partial<Locale>
}) {

  const defaultClassNames =
    getDefaultClassNames()


  const ref =
    React.useRef<HTMLButtonElement>(null)


  React.useEffect(() => {

    if (
      modifiers.focused
    ) {
      ref.current?.focus()
    }

  }, [
    modifiers.focused,
  ])


  return (
    <Button
      ref={ref}

      variant="ghost"

      size="icon"

      data-day={
        day.date.toLocaleDateString(
          locale?.code
        )
      }


      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }


      data-range-start={
        modifiers.range_start
      }


      data-range-end={
        modifiers.range_end
      }


      data-range-middle={
        modifiers.range_middle
      }


      className={cn(
        "size-8 rounded-md p-0 font-normal",
        defaultClassNames.day,
        className
      )}


      {...props}
    />
  )
}


export {
  Calendar,
  CalendarDayButton,
}