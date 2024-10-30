import { CalendarIcon } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { FormControl } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

interface CalendarPopoverProps<T extends FieldValues> {
  field: ControllerRenderProps<T>;
}

export function CalendarPopover<T extends FieldValues>({ field }: CalendarPopoverProps<T>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value ? (
              format(field.value, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="opacity-50 ml-auto w-4 h-4" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-auto" align="start">
        <Calendar
          className="font-body"
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date) =>
            date < new Date()
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}