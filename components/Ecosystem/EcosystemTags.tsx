import type { Tag } from "./EcosystemSection";

type TagDataValue = {
    color: string;
    additionalStyles?: string;
};

type TagData = {
    [K in Tag]: TagDataValue;
};

// Example usage
const tagData: TagData = {
    bridge: { color: "blue-500" },
    dashboard: { color: "yellow-500" },
    defi: { color: "red-500" },
    explorer: { color: "purple-500" },
    gaming: { color: "green-500" },
    nft: { color: "orange-600" },
    oracle: { color: "indigo-500" },
    wallet: { color: "rose-500" },
    zk: { color: "neutral-500" },
    enabler: { color: "neutral-500" },
    a3: { color: "[#E81899]" },
    a5: { color: "[#E81899]", additionalStyles: "glow-pulse" },
    a6: { color: "[#E81899]" },
    "coming-soon": { color: "neutral-500" },
    all: { color: "green-500" },
};

function EcosystemTags({ tags }) {
    // For each tag, render a tag component
    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag) => {
                const { color, additionalStyles = "" } = tagData[tag] || {
                    color: "neutral-500",
                };
                return (
                    <Tag
                        key={tag}
                        color={color}
                        text={tag}
                        additionalStyles={additionalStyles}
                    />
                );
            })}
        </div>
    );
}

// Generic Tag Component
function Tag({ color, text, additionalStyles }) {
    return (
        <div
            className={`bg-${color} text-white text-xs font-bold px-2 py-1 rounded-md mb-4 ${additionalStyles}`}>
            {text}
        </div>
    );
}

export { EcosystemTags };
