'use client';

import { useMemo } from 'react';
import { DateRange } from 'react-day-picker';
import { useForm, useWatch } from 'react-hook-form';

import { DatePickerForm } from '../ui/date-picker';
import { Form, FormField } from '../ui/form';

export function DatePickerComponent() {
  const form = useForm({
    defaultValues: {
      time: {
        from: new Date(2024, 1, 0, 8),
        // Midnight
        to: new Date(2024, 11, 0, 0),
      } as DateRange,
      isHalfDay: false as boolean | undefined,
    },
  });
  const timeValue = useWatch({
    control: form.control,
    name: 'time',
  });
  const isSameDay = useMemo(() => {
    if (!timeValue) return false;
    return timeValue.from?.getTime() === timeValue.to?.getTime();
  }, [timeValue]);
  const onSubmit = (data: (typeof form)['control']['_defaultValues']) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <DatePickerForm control={form.control} name="time" />
        <FormField
          shouldUnregister={!isSameDay}
          name="isHalfDay"
          control={form.control}
          render={() => (
            <div>
              <label>
                <input type="checkbox" {...form.register('isHalfDay')} />
                Half day
              </label>
            </div>
          )}
        />
      </form>
    </Form>
  );
}
