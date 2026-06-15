import Link from "next/link";
import { IconBook2, IconMarkdown } from "@tabler/icons-react";

import { buttonVariants } from "@/components/ui/button-variants";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const lightRayClassName =
  "[stroke-dasharray:1_0] [stroke-dashoffset:0] motion-safe:[animation:readme-light-ray_1.8s_ease-in-out_infinite] motion-safe:[animation-fill-mode:both]";

export default function ReadmeCta() {
  return (
    <div className="relative isolate h-24 w-full min-w-0 max-w-[16rem] justify-self-center overflow-visible">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -rotate-35 right-4 -top-2 inline-block origin-[50%_65%]  font-hand text-md font-extrabold leading-none text-secondary sm:-right-6 sm:top-6 sm:rotate-20"
      >
        <span className="relative inline-block whitespace-nowrap leading-tight">
          <span className="inline-block motion-safe:invisible">thoughts?</span>
          <span
            className="hidden motion-safe:absolute motion-safe:inset-s-0 motion-safe:top-0 motion-safe:inline-block motion-safe:whitespace-nowrap motion-safe:before:animate-[readme-thoughts-type_5.4s_steps(1,end)_infinite] motion-safe:before:content-['thoughts?'] motion-safe:after:ml-[0.025em] motion-safe:after:inline-block motion-safe:after:h-[0.9em] motion-safe:after:w-[0.075em] motion-safe:after:translate-y-[0.1em] motion-safe:after:animate-[readme-thoughts-cursor_5.4s_steps(1,end)_infinite] motion-safe:after:bg-current motion-safe:after:content-['']"
            aria-hidden="true"
          />
        </span>
      </span>

      <svg
        aria-hidden="true"
        viewBox="0 0 64 64"
        className="pointer-events-none text-warning absolute size-8 left-10 -top-2 -rotate-5 sm:size-8 sm:-left-4.5 sm:top-4 sm:-rotate-20"
        fill="none"
      >
        <g
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        >
          <path d="M27 32 C18 26 22 12 34 12 C46 13 47 28 38 33 C35 35 34 38 34 41 L29 41 C29 37 30 34 27 32" />
          <path d="M28 47 L36 47" />
          <path d="M29 53 L35 53" />
          <path
            className={lightRayClassName}
            pathLength={1}
            d="M31 5 L31 1"
          />
          <path
            className={cn(
              lightRayClassName,
              "motion-safe:[animation-delay:120ms]",
            )}
            pathLength={1}
            d="M48 13 L52 9"
          />
          <path
            className={cn(
              lightRayClassName,
              "motion-safe:[animation-delay:240ms]",
            )}
            pathLength={1}
            d="M15 14 L11 10"
          />
          <path
            className={cn(
              lightRayClassName,
              "motion-safe:[animation-delay:360ms]",
            )}
            pathLength={1}
            d="M51 31 L57 30"
          />
          <path
            className={cn(
              lightRayClassName,
              "motion-safe:[animation-delay:480ms]",
            )}
            pathLength={1}
            d="M12 31 L6 30"
          />
        </g>
      </svg>

      <svg
        aria-hidden="true"
        viewBox="0 0 412.985 412.985"
        className="pointer-events-none text-warning absolute size-12 top-2 rotate-110 sm:size-16 sm:-left-5 sm:top-12 sm:rotate-30"
      >
        {/* Source: Loop Right Arrow Outline, SVG Repo. https://www.svgrepo.com/show/48752/loop-right-arrow-outline.svg */}
        <path
          fill="currentColor"
          d="M375.895,0.059c-34.885,4.284-67.32,19.584-102.204,20.808c-3.672,0-6.732,3.06-6.732,6.732c0,1.224,0,2.448,0,4.284c0,2.448,1.225,4.896,3.061,5.508c11.016,5.508,20.808,12.852,31.212,19.584c0,0-0.612,0-1.225,0.612c-35.496,20.808-69.768,45.288-100.98,74.052c-34.884-35.496-67.932-73.44-109.548-100.98c-3.06-1.836-6.732-0.612-8.568,2.448c-15.3,22.032-31.212,42.84-48.348,64.26c-3.06,3.672-1.836,8.568,3.06,10.404c44.064,17.136,82.62,45.9,127.296,59.976c-14.688,15.912-28.764,32.436-41.616,49.573c-37.332,50.796-67.932,132.191-5.508,177.479c52.02,37.332,120.564,12.24,160.344-30.6c52.021-55.692,37.944-129.744-10.403-181.765c-1.836-1.836-4.284-2.448-6.12-1.224c-1.836-1.836-3.672-3.06-5.508-4.896c-3.672-2.448-6.732-5.508-10.404-7.956c33.048-24.48,67.932-48.348,93.636-80.172c0,0.612,0.612,0.612,1.225,1.224c10.403,8.568,22.644,14.076,33.659,21.42c4.284,2.448,9.792-0.612,9.792-5.508c0-32.436,0-65.484,0-97.92C382.626,3.73,379.566-0.553,375.895,0.059z M47.25,97.979C61.326,80.23,74.79,62.483,87.642,44.123c38.556,26.928,69.156,62.424,102.204,95.472c-7.344,6.732-14.076,13.464-20.808,20.808C128.034,139.595,88.866,115.727,47.25,97.979z M347.742,79.619c-3.672-3.06-7.956-1.224-10.404,1.836c-1.224-1.224-3.672-1.836-5.508,0c-52.02,52.02-118.728,86.904-168.912,140.76c-26.928,28.765-64.872,94.86-18.36,126.072c35.496,23.868,82.62-3.06,105.876-31.824c35.495-44.063,9.18-94.248-34.885-118.728c-7.344-3.672-12.852,6.12-6.12,10.404c41.616,28.765,61.812,68.545,22.645,108.937c-24.48,25.092-78.948,43.452-93.636-1.224c-17.136-52.021,49.572-102.816,83.232-130.969c4.284-3.672,8.568-6.732,12.853-9.792c4.896,2.448,9.792,4.284,14.688,7.344c1.836,1.224,4.284,2.448,6.12,4.284c0,1.224,0.612,3.06,1.836,4.284c48.348,52.021,55.08,119.953,3.061,171.973c-39.169,38.556-106.488,53.855-147.493,9.792c-50.796-54.469,6.12-133.416,43.452-177.481c42.84-50.184,94.86-94.86,148.104-132.804c1.224-0.612,1.836-2.448,1.224-3.672c2.448,1.836,4.896,3.06,7.345,4.896c4.283,2.448,9.18-3.672,5.508-6.732s-22.032-15.912-31.212-23.868c28.151-3.06,54.468-12.852,82.62-18.36c0,26.316,0,52.02,0,78.336C361.818,89.411,353.862,85.126,347.742,79.619z"
        />
      </svg>

      <svg
        aria-hidden="true"
        viewBox="0 0 367.339 367.34"
        className="pointer-events-none text-secondary scale-y-[-1] absolute size-8
        right-1 top-2 rotate-80 sm:size-8 sm:right-5 sm:top-9 sm:rotate-100"
      >
        {/* Source: Swirly Scribbled Arrow, SVG Repo. https://www.svgrepo.com/show/13856/swirly-scribbled-arrow.svg */}
        <path
          fill="currentColor"
          d="M337.591,0.932c-13.464,6.12-26.315,12.852-39.168,20.196c-11.628,6.12-25.704,12.24-35.496,21.42c-5.508,4.896,0,15.3,7.344,12.852c0,0,0.612,0,0.612-0.612c1.836,1.224,3.061,2.448,4.896,4.284c0,0.612,0.611,1.836,0.611,2.448c0.612,1.224,1.836,2.448,3.061,3.672c-17.748,33.048-34.272,66.096-55.08,96.696c-6.12,9.18-12.853,17.748-20.808,25.704c-19.584-31.212-51.409-67.32-89.965-60.588c-50.796,9.18-23.256,63.647,3.06,82.008c31.212,22.644,58.14,21.42,85.068,0c12.24,20.808,20.809,44.063,19.584,66.708c-1.836,54.468-50.796,63.647-91.8,49.571c6.12-15.912,7.956-34.271,4.284-50.184c-6.12-28.764-50.184-54.468-75.888-34.272c-25.092,20.196,22.032,71.604,37.332,82.009c4.284,3.06,9.18,6.119,14.076,8.567c-0.612,0.612-0.612,1.225-1.224,1.836c-28.152,44.064-65.484,6.12-82.62-25.092c-2.448-4.896-9.18-0.612-7.344,4.284c14.076,32.436,42.84,70.38,81.396,48.348c9.18-5.508,17.136-13.464,22.644-23.256c33.66,13.464,72.829,13.464,97.308-17.136c29.376-36.72,11.017-84.456-8.567-119.952c0.611-0.612,0.611-0.612,1.224-1.224c34.884-33.66,56.304-81.396,78.336-124.236c4.284,3.06,9.181,6.12,13.464,9.18c3.061,1.836,7.345,1.224,9.792-1.224c17.748-20.808,31.212-45.9,35.496-73.44C351.055,2.768,344.324-2.128,337.591,0.932z M178.471,207.787c-23.256,13.464-46.512-3.06-63.648-18.972c-22.644-20.808-16.524-54.468,18.36-47.735c17.748,3.672,31.824,19.584,43.452,32.436c6.12,6.732,12.241,14.687,17.749,23.255C189.488,201.056,183.979,204.728,178.471,207.787z M116.047,319.171C116.047,319.171,115.435,319.171,116.047,319.171c-16.524-8.567-28.764-20.808-38.556-36.107c-4.284-6.732-7.956-14.076-9.792-22.032c-6.12-20.808,26.928-10.404,35.496-6.12C126.451,267.764,124.615,297.14,116.047,319.171z M306.379,67.028c-0.612,0-0.612-0.612-1.224-0.612c0-1.836-1.225-3.672-3.672-4.896c-4.284-1.836-8.568-4.284-12.853-6.732c-1.836-1.224-5.508-4.896-5.508-3.672c0-0.612-0.612-1.224-1.224-1.224c6.731-3.672,13.464-8.568,20.195-12.24c8.568-4.896,17.748-9.792,26.929-14.688C324.74,38.264,316.784,53.564,306.379,67.028z"
        />
      </svg>

      <Tooltip>
        <TooltipTrigger
          render={
            <Link
              href="/diary"
              aria-label="Open diary"
              className={cn(
                buttonVariants({
                  variant: "tertiary",
                  className: "py-4.5",
                }),
                "absolute left-1/2 top-12 z-20 origin-center [--readme-button-rotate:-10deg] transform-[translateX(-50%)_rotate(var(--readme-button-rotate))] px-2 py-1.5 motion-safe:animate-[readme-button-wiggle_2.8s_ease-in-out_infinite] sm:[--readme-button-rotate:-8deg]",
              )}
            >
              <IconMarkdown
                className="size-4"
                stroke={1.5}
                aria-hidden="true"
              />
              <span className="text-lg">README.MD</span>
            </Link>
          }
        />
        <TooltipContent
          side="bottom"
          sideOffset={-2}
          className="rotate-[-10deg] sm:rotate-[-8deg]"
        >
          <IconBook2
            className="size-3"
            aria-hidden="true"
          />
          open diary
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
