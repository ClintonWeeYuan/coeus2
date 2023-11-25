import { cn } from "@/lib/utils";

interface Props {
    className?: string;
    numSlots: number;
}

function EventCard ({ className, numSlots } : Props) {

    const height = 80 * numSlots - 8;

    return (
        <div style={{ height }} className={cn(" w-full bg-sky-300 rounded-lg shadow text-left px-2 py-2", className)}>
            <p className="text-xs text-gray-500">4.30 - 5.30pm </p>
            <p>Class with Zoe</p>
        </div>
    );
};

export default EventCard;