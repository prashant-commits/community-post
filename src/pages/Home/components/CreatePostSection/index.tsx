import PostTextArea from "./components/PostTextArea";

const CreatePostSection: React.FC = () => {

    return <section className="rounded-lg bg-zinc-800 ring-1 ring-zinc-700 py-6 px-5">
        <h3 className="text-lg text-gray-300 font-medium mb-4">Create post</h3>
        <PostTextArea/>
        <button className="block mt-4 w-[112px] ml-auto mr-0">Post</button>
    </section>
}

export default CreatePostSection;