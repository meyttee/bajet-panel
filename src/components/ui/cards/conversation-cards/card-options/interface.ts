export interface OptionItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface CardOptionsProps {
  options?: OptionItem[];
  onOptionSelect?: (value: string) => void;
}
