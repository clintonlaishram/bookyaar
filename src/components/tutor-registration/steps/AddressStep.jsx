import React from 'react'
import StepSection from './StepSection';
import LocationPicker from '@/components/maps/LocationPicker';

import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function AddressStep({ formData, onChange, location, setLocation }) {
  return (
    <StepSection
      title="Address"
      description="This helps us match you with nearby students."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
        <div
          id="google-map"
          className="col-span-full h-120 bg-muted rounded-xl overflow-hidden"
        >
          <LocationPicker
            value={location}
            onChange={(loc) => {
              setLocation(loc);
              onChange("address_line1")({
                target: { value: loc.address ?? "", type: "text" },
              });
              onChange("address_line2")({
                target: { value: loc.address_line1 ?? "", type: "text" },
              });
              onChange("locality")({
                target: { value: loc.locality ?? "", type: "text" },
              });
              onChange("city")({
                target: { value: loc.city ?? "", type: "text" },
              });
              onChange("district")({
                target: { value: loc.district ?? "", type: "text" },
              });
              onChange("state")({
                target: { value: loc.state ?? "", type: "text" },
              });
              onChange("pincode")({
                target: { value: loc.pincode ?? "", type: "text" },
              });
            }}
          />
        </div>

        <div className="col-span-full">
          <Label
            htmlFor="address-line1"
            className="text-base font-medium text-foreground"
          >
            Address Line 1
          </Label>
          <Textarea
            id="address-line1"
            name="address_line1"
            placeholder="123, Main Street, Near City Mall"
            className="mt-2"
            rows={2}
            value={formData.address_line1}
            onChange={onChange("address_line1")}
          />
        </div>

        <div className="col-span-full">
          <Label
            htmlFor="address-line2"
            className="text-base font-medium text-foreground"
          >
            Address Line 2
          </Label>
          <Textarea
            id="address-line2"
            name="address_line2"
            placeholder="Avenue Road, Sector 5"
            className="mt-2 placeholder:italic placeholder:text-stone-300"
            rows={2}
            value={formData.address_line2}
            onChange={onChange("address_line2")}
          />
        </div>

        <div className="col-span-full sm:col-span-3">
          <Label
            htmlFor="locality"
            className="text-base font-medium text-foreground"
          >
            Locality
          </Label>
          <Input
            type="text"
            id="locality"
            name="locality"
            placeholder="Sector 5"
            className="mt-2"
            value={formData.locality}
            onChange={onChange("locality")}
          />
        </div>

        <div className="col-span-full sm:col-span-3">
          <Label
            htmlFor="city"
            className="text-base font-medium text-foreground"
          >
            City
          </Label>
          <Input
            type="text"
            id="city"
            name="city"
            placeholder="Bangalore"
            className="mt-2"
            value={formData.city}
            onChange={onChange("city")}
          />
        </div>

        <div className="col-span-full sm:col-span-3">
          <Label
            htmlFor="district"
            className="text-base font-medium text-foreground"
          >
            District
          </Label>
          <Input
            type="text"
            id="district"
            name="district"
            placeholder="Bangalore Urban"
            className="mt-2"
            value={formData.district}
            onChange={onChange("district")}
          />
        </div>

        <div className="col-span-full sm:col-span-3">
          <Label
            htmlFor="state"
            className="text-base font-medium text-foreground"
          >
            State
          </Label>
          <Input
            type="text"
            id="state"
            name="state"
            placeholder="Karnataka"
            className="mt-2"
            value={formData.state}
            onChange={onChange("state")}
          />
        </div>

        <div className="col-span-full sm:col-span-3">
          <Label
            htmlFor="pincode"
            className="text-base font-medium text-foreground"
          >
            Pincode
          </Label>
          <Input
            type="number"
            id="pincode"
            name="pincode"
            placeholder="560001"
            className="mt-2"
            value={formData.pincode}
            onChange={onChange("pincode")}
          />
        </div>

        <div className="col-span-full">
          <Label
            htmlFor="preferred-localities"
            className="text-base font-medium text-foreground"
          >
            Preferred Localities (comma separated)
          </Label>
          <Input
            type="text"
            id="preferred-localities"
            name="preferred_localities"
            placeholder="Indiranagar, Koramangala"
            className="mt-2"
            value={formData.preferred_localities}
            onChange={onChange("preferred_localities")}
          />
        </div>
      </div>
    </StepSection>
  );
}


export default AddressStep