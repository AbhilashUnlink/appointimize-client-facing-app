export const CustomButton = ({
    label,
    onClick,
    isSelected,
    minWidth = 120,
}: {
    label: string;
    onClick: () => void;
    isSelected: boolean;
    minWidth?: string | number;
}) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 sm:px-6 sm:py-3 hover:bg-[#D81B60] rounded-full ${isSelected ? "bg-[#D81B60] text-white" : "bg-black text-white"}`}
        style={{
            whiteSpace: "nowrap",
            minWidth: minWidth,
        }}
    >
        {label}
    </button>
);