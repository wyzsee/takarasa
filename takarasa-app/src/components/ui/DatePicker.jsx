import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDots } from "@phosphor-icons/react";
import { registerLocale } from "react-datepicker";
import id from "date-fns/locale/id";

registerLocale("id", id);

export default function DatePicker({ value, onChange }) {
  return (
    <div className="relative w-full">
      <ReactDatePicker
        selected={value}
        onChange={onChange}
        locale="id"
        dateFormat="dd MMMM yyyy"
        maxDate={new Date()}
        placeholderText="Tanggal Lahir"
        className="block w-full rounded-xl border border-grey-50 px-4 py-2 pr-12 text-grey-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
        wrapperClassName="w-full"
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100}
      />
      <CalendarDots
        size={20}
        weight="regular"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-100 pointer-events-none"
      />
    </div>
  );
}
