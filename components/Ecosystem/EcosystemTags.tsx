function EcosystemTags({ tags }) {
    // | "bridge"
    // | "dashboard"
    // | "defi"
    // | "explorer"
    // | "gaming"
    // | "nft"
    // | "oracle"
    // | "wallet"
    // | "zk"
    function getTag(tag) {
        switch (tag) {
            case "bridge":
                return <BridgeTag />;
            case "dashboard":
                return <DashboardTag />;
            case "defi":
                return <DefiTag />;
            case "explorer":
                return <ExplorerTag />;
            case "gaming":
                return <GamingTag />;
            case "nft":
                return <NftTag />;
            case "oracle":
                return <OracleTag />;
            case "wallet":
                return <WalletTag />;
            case "zk":
                return <ZkTag />;
            case "a3":
                return <TestnetA3Tag />;
            case "a5":
                return <TestnetA5Tag />;
            case "a6":
                return <TestnetA6Tag />;
            case "coming-soon":
                return <ComingSoonTag />;
            case "live":
                return <LiveTag />;
            case "enabler":
                return <EnablerTag />;
            default:
                return <DefaultTag text={tag} />;
        }
    }

    // For each tag, render a tag component
    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag) => getTag(tag))}
        </div>
    );
}

function LiveTag() {
    return (
        <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md mb-4">
            Live on testnet
        </div>
    );
}

function ComingSoonTag() {
    return (
        <div className="bg-neutral-500 text-white text-xs font-bold px-2 py-1 rounded-md mb-4">
            Coming soon
        </div>
    );
}

function TestnetA3Tag() {
    return (
        <div className="bg-[#e97ec0] text-white text-xs font-bold px-2 py-1 rounded-md mb-4">
            Testnet A3
        </div>
    );
}

function TestnetA5Tag() {
    return (
        <div className="bg-[#E81899] text-white text-xs font-bold px-2 py-1 rounded-md mb-4 glow-pulse">
            Testnet A5
        </div>
    );
}

function TestnetA6Tag() {
    return (
        <div className="bg-[#E81899] text-white text-xs font-bold px-2 py-1 rounded-md mb-4">
            Testnet A6
        </div>
    );
}

function BridgeTag() {
    return (
        <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md mb-4">
            Bridge
        </div>
    );
}

function DashboardTag() {
    return (
        <div className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-md mb-4">
            Dashboard
        </div>
    );
}

function DefiTag() {
    return (
        <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md mb-4">
            DeFi
        </div>
    );
}

function ExplorerTag() {
    return (
        <div className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-md mb-4">
            Explorer
        </div>
    );
}

function GamingTag() {
    return (
        <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md mb-4">
            Gaming
        </div>
    );
}

function NftTag() {
    return (
        <div className="bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-md mb-4">
            NFT
        </div>
    );
}

function OracleTag() {
    return (
        <div className="bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-md mb-4">
            Oracle
        </div>
    );
}

function WalletTag() {
    return (
        <div className="bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-md mb-4">
            Wallet
        </div>
    );
}

function ZkTag() {
    return (
        <div className="bg-neutral-500 text-white text-xs font-bold px-2 py-1 rounded-md mb-4">
            ZK
        </div>
    );
}

function EnablerTag() {
    return (
        <div className="text-white text-xs font-bold px-2 py-1 rounded-md mb-4 silver-gradient">
            Enabler
        </div>
    );
}
function DefaultTag({ text }) {
    return (
        <div className="bg-neutral-500 text-white text-xs font-bold px-2 py-1 rounded-md mb-4">
            {text}
        </div>
    );
}

export { EcosystemTags };
