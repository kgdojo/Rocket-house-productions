'use client';
import { components } from '@/slices';
import { SliceZone } from '@prismicio/react';
interface LessonContentProps {
  position?: number | null | undefined;
  title?: string | null | undefined;
  moduleTitle?: string | null | undefined;
  page?: any;
  description?: string | null | undefined;
  category?: string | null | undefined;
}

export function LessonContent({ title, moduleTitle, page, description, position, category }: LessonContentProps) {
  if (page) {
    title = page.data.title;
  }

  return (
    <>
      <h1 className={'heading flex flex-col pt-10 font-bold'}>
        <small className={'text-pink-500 lg:text-xl'}>
          {moduleTitle} - {category}
        </small>
        <span className={'text-2xl lg:text-4xl'}>{title}</span>
      </h1>
      <div className={'prose prose-sm md:prose-md lg:prose-lg max-w-5xl'}>
        {(description || description?.length) && <div dangerouslySetInnerHTML={{ __html: description }}></div>}
        {page && <SliceZone slices={page.data.slices} components={components} />}
      </div>
    </>
  );
}

export default LessonContent;
