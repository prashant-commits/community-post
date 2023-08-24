import { useApp } from "../../contexts/App";
import { useEffect, useState } from "react";

const usePosts = () => {
    const { user } = useApp()
    const [posts, setPosts] = useState<Post[]>([]);


    useEffect(() => {
        if (posts.length === 0) return;
        localStorage.setItem("posts", JSON.stringify(posts))
    }, [posts])

    useEffect(() => {
        const postsStr = localStorage.getItem("posts")

        if (!postsStr) return;
        const parsed = JSON.parse(postsStr) as Post[];
        if (parsed && typeof parsed === "object" && parsed[0]) {
            setPosts(parsed)
        }
    }, [])

    const submitPost = async (status: string, text: string) => {
        if (!user) return

        setPosts(prev => {
            return [...prev, { status: status, text: text, createdAt: Date.now(), user: user.username }]
        })
    }

    return [posts, submitPost] as const;
}

export default usePosts;