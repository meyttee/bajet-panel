import { Control, FieldValues, Path } from "react-hook-form";

type ToggleSize = "fixed" | "auto";

interface ToggleItem {
  label: string;
  value: string;
  disabled?: boolean;
}

interface ToggleBaseProps {
  value: string;
  onValueChange: (value: string) => void;
  size?: ToggleSize;
}

interface Primary {
  variant?: "primary";
  items: ToggleItem[];
  disabled?: boolean;
  readonly?: boolean;
  onOff?: false;
}

interface Secondary {
  variant?: "secondary";
  items: ToggleItem[];
}

interface PrimaryWithOff {
  variant?: "primary";
  items: [ToggleItem, ToggleItem];
  onOff?: true;
  disabled?: boolean;
  readonly?: boolean;
}

type ToggleProps = ToggleBaseProps & (Primary | Secondary | PrimaryWithOff);

type RHFToggleProps<TFieldValues extends FieldValues> = (
  | Primary
  | PrimaryWithOff
) & {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  size?: ToggleSize;
};
