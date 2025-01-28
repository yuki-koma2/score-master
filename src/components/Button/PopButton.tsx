
"use client";

import { ArrowRight } from 'lucide-react';
import React, { useCallback } from 'react';
import { createClient } from "@/app/lib/supabase/client";

function PopButton() {
    const supabase = createClient()
    const showUser = useCallback(async () => {

        const {data: {user}} = await supabase.auth.getUser()
        console.log("user",user)


        const { data: users, error :dbError } = await supabase
            .from('users')
            .select('*')
        console.log("db users",users, dbError)

        // const { data : dbUser, error } = await supabase
        //     .from('users')
        //     .insert([
        //         { some_column: 'someValue', other_column: 'otherValue' },
        //     ])
        //     .select()

        const { data: db, error } = await supabase
            .from('countries')
            .insert([
                { name: 'someValue'}
            ])
            .select()

        console.log("db co",db, error)
        if (error) {
            console.error(error.message)
            console.error(error.code)
            console.error(error.hint)
            console.error(error.details)
        }

    }, [supabase]);
    return (
        <button onClick={showUser}>
            <div
                className='group relative cursor-pointer p-2 w-32 border bg-white rounded-full overflow-hidden text-black text-center font-semibold'>
        <span
            className='translate-x-1 group-hover:translate-x-12 group-hover:opacity-0 transition-all duration-300 inline-block'>
          About
        </span>
                <div
                    className='flex gap-2 text-white z-10 items-center absolute top-0 h-full w-full justify-center translate-x-12 opacity-0 group-hover:-translate-x-1 group-hover:opacity-100 transition-all duration-300'>
                    <span>About user</span>
                    <ArrowRight/>
                </div>
                <div
                    className='absolute top-[40%] left-[20%] h-2 w-2 group-hover:h-full group-hover:w-full rounded-lg bg-black scale-[1] dark:group-hover:bg-[#e7cb6e] group-hover:bg-[#263381] group-hover:scale-[1.8] transition-all duration-300 group-hover:top-[0%] group-hover:left-[0%] '></div>
            </div>
        </button>
    );
}

export default PopButton;
