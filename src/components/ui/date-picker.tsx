/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { DateRange } from 'react-day-picker';
import { Control, Path } from 'react-hook-form';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type KeysOfType<T, U, B = false> = {
  [P in keyof T]: B extends true
    ? T[P] extends U
      ? U extends T[P]
        ? P
        : never
      : never
    : T[P] extends U
      ? P
      : never;
}[keyof T];
type PickByType<T, U, B = false> = Pick<T, KeysOfType<T, U, B>>;

type DatePickerFormProps<
  TForm extends Record<string, DateRange | any>,
  TKey extends Path<PickByType<TForm, DateRange>>,
> = {
  control: Control<TForm>;
  name: TKey;
  formLabel?: string;
  description?: string;
  message?: string;
  className?: string;
};

export function DatePickerForm<
  TForm extends Record<string, DateRange | any>,
  TKey extends Path<PickByType<TForm, DateRange>>,
>({
  control,
  name,
  formLabel,
  message,
  className,
}: DatePickerFormProps<TForm, TKey>) {
  return (
    <div className="space-y-8">
      <FormField
        control={control}
        name={name as Path<TForm>}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel hidden={!formLabel}>{formLabel}</FormLabel>
            <div className={cn('grid gap-2', className)}>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      id="date"
                      variant={'outline'}
                      className={cn(
                        'w-[300px] justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 size-4" />
                      {field.value?.from ? (
                        field.value?.to ? (
                          <>
                            {format(field.value.from, 'LLL dd, y')} -{' '}
                            {format(field.value.to, 'LLL dd, y')}
                          </>
                        ) : (
                          format(field.value.from, 'LLL dd, y')
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={field.value?.from}
                    selected={field.value}
                    onSelect={field.onChange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <FormDescription hidden={!message}>{message}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
