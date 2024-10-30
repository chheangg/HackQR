import { CalendarIcon } from "lucide-react";
import { TimePicker } from "./time-picker";
import { Button } from "./ui/button";
import { FormControl } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "../lib/utils";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { format } from "date-fns";

interface TimePickerPopoverProps<T extends FieldValues> {
  initDate?: Date;
  field: ControllerRenderProps<T>;
}

export function TimePickerPopover<T extends FieldValues>({ initDate, field }: TimePickerPopoverProps<T>) {
  console.log(initDate);
  return (
    <Popover>
      <FormControl>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !field.value && "text-muted-foreground",
              !initDate && 'opacity-50 pointer-events-none'
            )}
            disabled={!initDate}
          >
            <CalendarIcon className="mr-2 w-4 h-4" />
            {field.value ? (
              format(field.value, "PPP HH:mm:ss")
            ) : (
              <span>Pick a time</span>
            )}
          </Button>
        </PopoverTrigger>
      </FormControl>
      <PopoverContent className="p-0 w-auto font-body">
        <div className="p-3 border-t border-border">
          <TimePicker
            setDate={field.onChange}
            initDate={initDate}
            date={field.value}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}