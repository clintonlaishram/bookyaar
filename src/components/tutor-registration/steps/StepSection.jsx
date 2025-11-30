import { Separator } from '@/components/ui/separator';
import React from 'react'

function StepSection({ title, description, children }) {
  return (
    <>
      <Separator className="my-8" />
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        <div>
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          <p className="mt-1 text-base leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="sm:max-w-4xl md:col-span-2">{children}</div>
      </div>
    </>
  );
}


export default StepSection