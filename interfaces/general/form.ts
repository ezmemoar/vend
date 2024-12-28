import { type FormSubmitEvent } from "#ui/types";
import { type ManipulateType } from "dayjs";
import type { InferType, ISchema } from "yup";

export type FormDatePicker = Date | null;
export interface DateRangePicker {
  start: FormDatePicker;
  end: FormDatePicker;
}
export type FormDateRangeType =
  | Date
  | {
      duration: number;
      unit: ManipulateType;
    };
export interface FormDateRangeOptions {
  label: string;
  start?: FormDateRangeType;
  end?: FormDateRangeType;
}

export type FormEventSubmit<T extends ISchema<any, any>> = FormSubmitEvent<
  InferType<T>
>;
