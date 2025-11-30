import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import StepSection from './StepSection';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

function formatDate(date) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date) {
  if (!date) return false;
  return !isNaN(date.getTime());
}


function PersonalInfoStep({
  formData,
  onChange,
  date,
  month,
  setMonth,
  value,
  setValue,
  open,
  setOpen,
  setDate,
}) {
  return (
    <StepSection
      title="Personal information"
      description="Basic details to create your tutor profile."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
        <div className="col-span-full sm:col-span-3">
          <Label
            htmlFor="first-name"
            className="text-base font-medium text-foreground"
          >
            First name
          </Label>
          <Input
            type="text"
            id="first-name"
            name="first_name"
            autoComplete="given-name"
            placeholder="Emma"
            className="mt-2"
            value={formData.first_name}
            onChange={onChange("first_name")}
          />
        </div>

        <div className="col-span-full sm:col-span-3">
          <Label
            htmlFor="middle-name"
            className="text-base font-medium text-foreground"
          >
            Middle name
          </Label>
          <Input
            type="text"
            id="middle-name"
            name="middle_name"
            autoComplete="additional-name"
            placeholder="Rose"
            className="mt-2"
            value={formData.middle_name}
            onChange={onChange("middle_name")}
          />
        </div>

        <div className="col-span-full sm:col-span-3">
          <Label
            htmlFor="last-name"
            className="text-base font-medium text-foreground"
          >
            Last name
          </Label>
          <Input
            type="text"
            id="last-name"
            name="last_name"
            autoComplete="family-name"
            placeholder="Crown"
            className="mt-2"
            value={formData.last_name}
            onChange={onChange("last_name")}
          />
        </div>

        <div className="col-span-full sm:col-span-3">
          <Label
            htmlFor="birthyear"
            className="text-base font-medium text-foreground"
          >
            Date of Birth
          </Label>
          <div className="relative flex gap-2 mt-2">
            <Input
              id="date"
              value={value}
              placeholder="June 01, 1995"
              className="bg-background pr-10"
              onChange={(e) => {
                const d = new Date(e.target.value);
                setValue(e.target.value);
                if (isValidDate(d)) {
                  setDate(d);
                  setMonth(d);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setOpen(true);
                }
              }}
            />
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="date-picker"
                  variant="ghost"
                  className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                  type="button"
                >
                  <CalendarIcon className="size-3.5" />
                  <span className="sr-only">Select date</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="end"
                alignOffset={-8}
                sideOffset={10}
              >
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  month={month}
                  onMonthChange={setMonth}
                  onSelect={(d) => {
                    setDate(d);
                    setValue(formatDate(d));
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="col-span-full sm:col-span-3">
          <Label
            htmlFor="gender"
            className="text-base font-medium text-foreground"
          >
            Gender
          </Label>
          <Select
            name="gender"
            value={formData.gender}
            onValueChange={(v) =>
              onChange("gender")({ target: { value: v, type: "text" } })
            }
          >
            <SelectTrigger id="gender" className="mt-2">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="others">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-full sm:col-span-3">
          <Label
            htmlFor="language"
            className="text-base font-medium text-foreground"
          >
            Languages (comma separated)
          </Label>
          <Input
            type="text"
            id="language"
            name="languages"
            autoComplete="off"
            placeholder="Hindi, English"
            className="mt-2"
            value={formData.languages}
            onChange={onChange("languages")}
          />
        </div>
      </div>
    </StepSection>
  );
}


export default PersonalInfoStep