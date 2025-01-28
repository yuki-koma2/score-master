"use client"
import ReviewCard from "@/components/Card/ReviewCard";
import { createClient } from "@/app/lib/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

const UserCard = () => {
    const supabase = createClient()
    // const {data: {user}} = await supabase.auth.getUser();
    // console.log("user card",user)

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true); // ローディング開始
            const {data, error} = await supabase.auth.getUser();
            if (error || !data || !data.user) {
                console.error("Error fetching user:", error || "No user found");
                setUser(null);
            } else {
                setUser(data.user);
            }
            setLoading(false); // ローディング終了
        };

        fetchUser();
    }, [supabase]);

    if (loading) {
        return <p>Loading...</p>;
    }


    if (!user) {
        // ユーザーが取得できない場合のフォールバック
        return <p>No user found</p>;
    }

    // const userMetaData = user.raw_user_meta_data || {};
    return (
        // <ReviewCard
        //     img={"https://lh3.googleusercontent.com/a/ACg8ocKXxBjugmu0Y3mT_XHWv1Y8SxykjhSscTgSkGqJhvkR_HNGWzst=s96-c"}
        //     name={"name"}
        //     username={"userName"}
        //     body={"this is a sample"}
        // />
        <ReviewCard
            img={user.user_metadata?.avatar_url || "https://via.placeholder.com/96"} // ユーザーの画像（フォールバック付き）
            name={user.user_metadata?.full_name || "Anonymous"} // ユーザーのフルネーム
            username={user.email || "No Email"} // ユーザーのメールアドレス
            body={"Welcome to your profile!"} // 固定のサンプル文
        />
        // <ReviewCard
        //     img={userMetaData.avatar_url || "https://via.placeholder.com/96"} // ユーザーの画像
        //     name={userMetaData.full_name || "Anonymous"} // ユーザーのフルネーム
        //     username={user.email || "No Email"} // ユーザーのメールアドレス
        //     body={`Hello, ${userMetaData.name || "User"}! Welcome back!`} // メッセージ
        // />
    )
};

export default UserCard;