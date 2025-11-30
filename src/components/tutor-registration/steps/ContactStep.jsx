import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react'
import StepSection from './StepSection';

function ContactStep({ formData, onChange }) {
  return (
    <StepSection
      title="Contact Details"
      description="We’ll use this information to contact you and share leads."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
        <div className="col-span-full">
          <Label
            htmlFor="email"
            className="text-base font-medium text-foreground"
          >
            Email
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            placeholder="emma@company.com"
            className="mt-2"
            value={formData.email}
            onChange={onChange("email")}
          />
        </div>

        <div className="col-span-full sm:col-span-3">
          <Label
            htmlFor="contact-number"
            className="text-base font-medium text-foreground"
          >
            Contact number
          </Label>
          <Input
            type="text"
            id="contact-number"
            name="phone"
            placeholder="+91 98765 43210"
            className="mt-2"
            value={formData.phone}
            onChange={onChange("phone")}
          />
        </div>

        <div className="col-span-full sm:col-span-3">
          <Label
            htmlFor="whatsapp-number"
            className="text-base font-medium text-foreground"
          >
            Whatsapp number
          </Label>
          <Input
            type="text"
            id="whatsapp-number"
            name="whatsapp_number"
            placeholder="+91 98765 43210"
            className="mt-2"
            value={formData.whatsapp_number}
            onChange={onChange("whatsapp_number")}
          />
        </div>

        <div className="col-span-full sm:col-span-3">
          <Label
            htmlFor="referral-code"
            className="text-base font-medium text-foreground"
          >
            Referral Code (optional)
          </Label>
          <Input
            type="text"
            id="referral-code"
            name="referral_code"
            placeholder="REF123"
            className="mt-2"
            value={formData.referral_code}
            onChange={onChange("referral_code")}
          />
        </div>
      </div>
    </StepSection>
  );
}


export default ContactStep