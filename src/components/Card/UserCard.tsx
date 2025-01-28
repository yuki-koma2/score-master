import ReviewCard from "@/components/Card/ReviewCard";
import { createClient } from "@/app/lib/supabase/client";

const UserCard = async () => {
    const supabase = createClient()
    const {data: {user}} = await supabase.auth.getUser();
    console.log(user)

    if (!user) {
        // ユーザーが取得できない場合のフォールバック
        return <p>No user found</p>;
    }
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
    )
};

export default UserCard;