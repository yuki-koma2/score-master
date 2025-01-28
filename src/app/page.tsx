import Image from "next/image";
import UniDirectional from "@/components/TextAnimation/UniDirectional";
import GoogleOneTap from "@/components/Auth/GoogleOneTap";
import PopButton from "@/components/Button/PopButton";
import MarqueeDemo from "@/components/Card/MarqueeDemo";
import UserCard from "@/components/Card/UserCard";

export default function Home() {


    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <Image
                    className="dark:invert"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />

                <UniDirectional/>
                <PopButton/>
                <MarqueeDemo/>
                <UserCard/>
                <GoogleOneTap/>
            </main>
        </div>
    );
}
