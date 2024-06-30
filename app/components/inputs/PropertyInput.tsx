'use client';

import { IconType } from "react-icons";

interface PropertyInputProps {
  icon: IconType,
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const PropertyInput: React.FC<PropertyInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        rounded-xl
        border-2
        w-full
        px-4
        py-2
        flex
        justify-center
        items-center
        gap-3
        text-yellow-900
        hover:border-neutral-200
        transition
        cursor-pointer
        ${selected ? 'border-neutral-200 bg-neutral-200 text-white' : 'border-neutral-200'}
      `}
    >
      <Icon size={20} />
      <p className="font-semibold text-sm">
        {label}
      </p>
    </div>
  );
}

export default PropertyInput;
