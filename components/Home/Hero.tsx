import React, { useEffect } from "react";

export function Hero() {
    useEffect(() => {
        // Calculate the initial baseline width
        const baselineWidth =
            window.innerWidth < 500
                ? window.innerWidth * 0.85
                : window.innerWidth / 2;

        const calculateWidthAndOpacity = () => {
            const elementHeight = window.scrollY;
            let width, opacity;

            if (window.innerWidth < 500) {
                width = Math.max(
                    baselineWidth,
                    window.innerWidth * 0.85 + elementHeight * 9
                );
                opacity = Math.max(0, 1 - elementHeight * 0.003);
            } else {
                width = Math.max(
                    baselineWidth,
                    window.innerWidth / 2 + elementHeight * 9
                );
                opacity = Math.max(0, 1 - elementHeight / 250);
            }

            return { width, opacity };
        };

        const changeTaikoGeom = () => {
            const taikoGeom = document.getElementById("taikoGeom");
            const taikoGeomParent = document.getElementById("taikoGeomParent");

            // Ensure the elements are found
            if (!taikoGeom || !taikoGeomParent) {
                return;
            }

            const { width, opacity } = calculateWidthAndOpacity();
            taikoGeomParent.style.width = `${width}px`;
            taikoGeom.style.opacity = `${opacity}`;
        };

        // Initialize the state on page load
        changeTaikoGeom();

        // Update state on scroll
        window.addEventListener("scroll", changeTaikoGeom);

        // Clean up the event listener
        return () => {
            window.removeEventListener("scroll", changeTaikoGeom);
        };
    }, []);

    return (
        <div className="mx-auto max-w-[90rem] px-3">
            <div className="relative bg-neutral-50 dark:bg-neutral-900 mt-3">
                <main className="lg:relative">
                    <div className="relative z-10 w-3/4 pt-16 pb-20 text-left lg:py-48">
                        <div className="pl-[max(env(safe-area-inset-left),1.5rem)]">
                            <h1 className="font-grotesk text-4xl md:text-5xl tracking-tight text-neutral-900 dark:text-neutral-100">
                                A <span className="text-[#e81899]">based</span>{" "}
                                rollup
                            </h1>
                            <p className="font-groteskmedium mt-3 text-lg text-neutral-600 sm:text-xl md:mt-5 dark:text-neutral-100">
                                Decentralized, Ethereum-equivalent (Type 1)
                                ZK-EVM.
                            </p>
                            <div className="mt-10 flex flex-col sm:flex-row md:justify-left">
                                <div className="inline-flex mb-4 sm:mb-0 sm:mr-4">
                                    <a
                                        href="https://docs.taiko.xyz/guides/deploy-a-contract"
                                        className="inline-flex items-center rounded-md border border-transparent bg-[#e81899] px-5 py-2.5 text-base font-semibold text-white dark:text-neutral-100 hover:bg-[#d1168a] hover:no-underline hover:text-white w-auto">
                                        Deploy a contract
                                    </a>
                                </div>
                                <div className="inline-flex">
                                    <a
                                        href="https://docs.taiko.xyz/guides/run-a-taiko-node"
                                        className="inline-flex items-center rounded-md border-2 border-[#e81899] bg-transparent px-5 py-2.5 text-base font-semibold text-[#e81899] hover:border-[#d1168a] hover:text-[#d1168a] hover:no-underline w-auto">
                                        Run a Taiko node
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        id="taikoGeomParent"
                        className="absolute inset-y-0 right-0 overflow-hidden h-full w-11/12 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
                        <img
                            id="taikoGeom"
                            className="absolute z-0 -right-6 overflow-visible h-full w-full object-cover max-w-none"
                            src="/images/Taiko_GEOM_1_Fluo_Sliced.svg"
                            alt=""
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}
