import Image from "next/image";
import UniDirectional from "@/components/TextAnimation/UniDirectional";
import GoogleOneTap from "@/components/Auth/GoogleOneTap";
import PopButton from "@/components/Button/PopButton";
import MarqueeDemo from "@/components/Card/MarqueeDemo";
import UserCard from "@/components/Card/UserCard";

import Header from "@/components/Header/Header";
import InputCounter from "@/components/Counter/Input";
import UpvoteDownvote from "@/components/Counter/motion-number";

export default function Home() {


    return (
        <>
            <Header/>
            {/*<div*/}
            {/*    className="flex items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">*/}
            <div className="p-8 pb-20">
                <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                    <Image
                        className="dark:invert"
                        src="/next.svg"
                        alt="Next.js logo"
                        width={180}
                        height={38}
                        priority
                    />

                    <InputCounter/>
                    <UpvoteDownvote/>
                    <UniDirectional/>
                    <PopButton/>
                    <MarqueeDemo/>
                    <UserCard/>

                    <GoogleOneTap/>
                </main>
            </div>
        </>
    );
}
