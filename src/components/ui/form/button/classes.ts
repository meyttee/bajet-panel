import { cva } from "class-variance-authority";

const buttonVariants = cva(
  `flex w-fit shrink-0 cursor-pointer flex-nowrap items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
  {
    variants: {
      variant: {
        default: `rounded-[20px] text-primary-foreground shadow-xs hover:bg-primary/90`,
        destructive: `rounded-[6px] !border !border-transparent !bg-red-600 px-3 py-2 !text-white hover:!border-red-600 hover:!bg-red-400 hover:!text-white disabled:!border-[#DC2626]/20 disabled:!bg-[#DC2626]/20`,
        outline: `rounded-[6px] border border-transparent bg-[#2F6FB5] active:ring disabled:border-[#2F6FB5]/32 disabled:bg-[#2F6FB5]/12 disabled:text-[#2F6FB5]/32`,
        ghost: `overflow-hidden rounded-[14px] p-2`,
        link: `!border-transparent !px-3 !py-1.5 text-[#2F6FB5] text-primary underline-offset-4 hover:!bg-[#E5E7EB] hover:text-[#2F6FB5] active:!border-gray-400 active:!ring-0 disabled:text-[#2F6FB5]/32`,
        subtle: `!hover:bg-zinc-50 !hover:text-zinc-700 !hover:border-zinc-600 !border-gray-400 !text-zinc-700`,
      },
      size: {
        default: `px-4 py-2`,
        sm: `gap-1.5 px-3 py-2`,
        lg: `w-[136px] px-2 py-2 has-[>svg]:px-4`,
        icon: `size-10`,
        full: "!w-full px-4 py-2",
      },
      isFilled: {
        true: `border border-transparent bg-[#2F6FB5] text-white hover:border-[#2F6FB5] hover:bg-white hover:text-[#2F6FB5] active:border-white active:bg-[#2F6FB5] active:text-white disabled:border-[#2F6FB5]/12 disabled:bg-[#2F6FB5]/12 disabled:text-[#2F6FB5]/25`,
        false: `border border-[#2F6FB5] bg-transparent text-[#2F6FB5] hover:bg-[#2F6FB5] hover:text-white active:bg-[#2F6FB5] active:ring`,
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      isFilled: false,
    },
    compoundVariants: [
      {
        variant: "outline",
        isFilled: false,
        className: `hover:border-[#2F6FB5] hover:bg-[#E5E7EB]/40 hover:text-[#2F6FB5] active:bg-[#2F6FB5]/25 active:ring-0 disabled:border-[#2F6FB5]/32 disabled:bg-white disabled:text-[#2F6FB5]/32`,
      },
      {
        variant: "outline",
        isFilled: true,
        className: "dieabled:bg-[#2F6FB5]/12",
      },
      {
        variant: "ghost",
        isFilled: false,
        className: `acitve:ring-0 border border-transparent bg-transparent !p-2 text-zinc-700 hover:bg-gray-100 hover:text-[#2F6FB5] active:border-[#2F6FB5] active:bg-zinc-200 active:text-[#2F6FB5] aria-selected:bg-[#2F6FB5] aria-selected:text-white`,
      },
      {
        variant: "subtle",
        isFilled: false,
        className:
          "hover:border-zinc-600 hover:bg-zinc-50 hover:text-zinc-700 active:border-transparent active:bg-transparent active:ring-0",
      },
    ],
  },
);

export { buttonVariants };
