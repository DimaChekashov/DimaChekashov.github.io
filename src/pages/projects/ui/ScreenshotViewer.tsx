"use client";

import { useLayoutEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";

type Screenshot = { src: string; title: string; alt: string };

export function ScreenshotViewer({ children, closeLabel }: {
  children: ReactNode;
  closeLabel: string;
}) {
  const [screenshot, setScreenshot] = useState<Screenshot | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const pagePosition = useRef({ left: 0, top: 0 });

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!screenshot || !dialog || dialog.open) return;
    dialog.showModal();
    scrollRef.current?.scrollTo(0, 0);
    closeRef.current?.focus({ preventScroll: true });
  }, [screenshot]);

  function openScreenshot(event: MouseEvent<HTMLDivElement>) {
    if (event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!(event.target instanceof Element) || typeof dialogRef.current?.showModal !== "function") return;

    const link = event.target.closest<HTMLAnchorElement>("a[data-screenshot-title]");
    const title = link?.dataset.screenshotTitle;
    const alt = link?.querySelector("img")?.alt;
    if (!link || !title || !alt) return;

    event.preventDefault();
    triggerRef.current = link;
    pagePosition.current = { left: window.scrollX, top: window.scrollY };
    setScreenshot({ src: link.href, title, alt });
  }

  function closeScreenshot() {
    dialogRef.current?.close();
    triggerRef.current?.focus({ preventScroll: true });
    window.scrollTo({ ...pagePosition.current, behavior: "instant" });
    setScreenshot(null);
  }

  return (
    <>
      <div className="space-y-12 sm:space-y-16" onClick={openScreenshot}>{children}</div>
      <dialog
        ref={dialogRef}
        className="project-dialog"
        aria-labelledby="project-screenshot-title"
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const first = closeRef.current;
          const last = scrollRef.current;
          if (event.shiftKey && event.target === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && event.target === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeScreenshot();
        }}
        onCancel={(event) => {
          event.preventDefault();
          closeScreenshot();
        }}
      >
        {screenshot && (
          <div className="project-dialog-content flex flex-col">
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-primary bg-bg-card px-4 py-2 sm:px-5">
              <h2 id="project-screenshot-title" className="min-w-0 font-semibold wrap-anywhere">
                {screenshot.title}
              </h2>
              <button
                ref={closeRef}
                type="button"
                className="min-h-11 shrink-0 rounded-xl bg-secondary px-4 text-sm font-semibold text-link hover:bg-blue-wash"
                onClick={closeScreenshot}
              >
                {closeLabel}
              </button>
            </div>
            <div ref={scrollRef} tabIndex={0} className="project-dialog-scroll min-h-0 overflow-y-auto overscroll-contain bg-secondary">
              {/* Preserve the original proportions of each screenshot. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={screenshot.src} alt={screenshot.alt} className="block h-auto w-full" />
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
