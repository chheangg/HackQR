import { DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogHeader, DialogContent, DialogTrigger } from "../../../components/ui/dialog";
import z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
import { CalendarPopover } from "../../../components/calendar-popover";
import { TimePickerPopover } from "../../../components/time-picker-popover";
import { Button } from "../../../components/ui/button";

const FormSchema = z.object({
  date: z.date({
    required_error: "An event date is required."
  }).default(new Date(Date.now())),
  timeStart: z.date({
    required_error: "A time to start is required."
  }),
  timeLate: z.date({
    required_error: "A time considered late is required."
  }),
  timeEnd: z.date({
    required_error: "A time to end the event is required."
  })
});

interface AttendanceFormProps {
  children: React.ReactNode;
}

export function AttendanceForm({ children }: AttendanceFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Dialog>
      <DialogTrigger>
        {children}
      </DialogTrigger>
      <DialogContent className="font-body">
        <DialogHeader className="font-bold text-lg">
          <DialogTitle>Attendance Date Form</DialogTitle>
        </DialogHeader>
        {/* Form fields */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 font-body">
            {/* date */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Event Date</FormLabel>
                  <CalendarPopover field={field} />
                  <FormDescription>
                  Pick the date of the event
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* timeStart */}
            <FormField
              control={form.control}
              name="timeStart"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-left">Event Starting Time</FormLabel>
                  <TimePickerPopover date={form.getValues('date')} field={field} />
                  <FormDescription>
                  Pick the time the event starts
                  </FormDescription>
                </FormItem>
              )}
            />
            {/* timeLate */}
            <FormField
              control={form.control}
              name="timeLate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-left">Event Late Time</FormLabel>
                  <TimePickerPopover date={form.getValues('date')} field={field} />
                  <FormDescription>
                  Pick the time where users will be considered late after
                  </FormDescription>
                </FormItem>
              )}
            />
            {/* timeEnd */}
            <FormField
              control={form.control}
              name="timeEnd"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-left">Event End Time</FormLabel>
                  <TimePickerPopover date={form.getValues('date')} field={field} />
                  <FormDescription>
                  Pick the time where the event ends
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button type='submit' className="bg-green-500 hover:bg-green-600">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}