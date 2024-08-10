'use client';
import { useRouter } from 'next/navigation';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import path from 'path';
import { useEffect, useState } from 'react';
import cn from 'classnames';

const steps = [
  {
    title: 'Step One',
    route: 'step-one',
    link: '/step-one',
  },
  {
    title: 'Step Two',
    route: 'step-two',
    link: '/step-one',
  },
  {
    title: 'Step Three',
    route: 'step-three',
    link: '/step-thee',
  },
  { title: 'Review', route: 'review', link: '/review' },
];

export default function StepNavigation() {
  const pathname = usePathname();
  const currentPath = path.basename(pathname);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    setCurrentStep(steps.findIndex(step => step.route === currentPath));
  }, [currentPath]);

  return (
    <div className="mb-12 mt-4 min-w-60 lg:mb-0">
      {/* back button */}
      <Link
        href={steps[currentStep - 1]?.link || steps[0].link}
        className="mb-4 flex items-center gap-2 text-xl disabled:text-white/50 lg:mb-12 lg:gap-5">
        Back
      </Link>

      {/* list of form steps */}
      <div className="relative flex flex-row justify-between">
        {steps.map((step, i) => (
          <Link
            href={step.link}
            key={step.link}
            className="group z-20 flex items-center gap-3 text-2xl"
            prefetch={true}>
            <span
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full border text-sm transition-colors duration-200 lg:h-12 lg:w-12 lg:text-lg',
                {
                  'border-none bg-teal-500 text-black group-hover:border-none group-hover:text-black':
                    currentPath === step.route,
                  'border-white/75 bg-gray-900 text-white/75 group-hover:border-white group-hover:text-white':
                    currentPath !== step.route,
                },
              )}>
              {i + 1}
            </span>
            <span
              className={cn('hidden text-white/75 transition-colors duration-200 group-hover:text-white lg:block', {
                'font-light': currentPath !== step.route,
                'font-semibold text-white': currentPath === step.route,
              })}>
              {step.title}
            </span>
          </Link>
        ))}
        <div className="absolute top-4 flex h-1 w-full border-b border-dashed" />
      </div>
    </div>
  );
}
