import { useState } from "react";
import PostTextArea from "./components/PostTextArea";

type CreatePostSectionProps = {
    onSubmit?: (status: string, text: string) => void
}

const CreatePostSection: React.FC<CreatePostSectionProps> = ({ onSubmit }) => {
    const [status, setStatus] = useState("")
    const [text, setText] = useState("")

    const handlePostChange = (status: string, value: string) => {
        setStatus(status)
        setText(value)
    }

    const handleSubmitPost = () => {
        onSubmit?.(status, text)
    }

    return <section className="rounded-lg bg-zinc-800 ring-1 ring-zinc-700 py-6 px-5">
        <h3 className="text-lg text-gray-300 font-medium mb-4">Create post</h3>
        <PostTextArea onChange={handlePostChange} />
        <button className="block mt-4 w-[112px] ml-auto mr-0" onClick={handleSubmitPost}>Post</button>
    </section>
}

export default CreatePostSection;