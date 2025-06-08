"use client";
import { useRouter } from 'next/navigation'

export default function Button({ text, href, disabled }: { text: string, href?: string, disabled?: boolean }) {
    const Router = useRouter();
  return (
    <button disabled={disabled} type='button' className="bg-background text-white px-8 py-2 rounded cursor-pointer hover:bg-foreground" onClick={() => Router.push(href || '')}>
        {text}
    </button>
  );
}
