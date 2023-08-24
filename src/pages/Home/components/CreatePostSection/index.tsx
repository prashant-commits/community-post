import { FormEventHandler, useLayoutEffect, useRef, useState } from "react";
import { usePopper } from "react-popper";
import { toast } from "sonner";

type CreatePostSectionProps = {
    onSubmit?: (status: string, text: string) => void
}

const CreatePostSection: React.FC<CreatePostSectionProps> = ({ onSubmit }) => {
    const [referenceElement, setReferenceElement] = useState<HTMLSpanElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const hiddenDivRef = useRef<HTMLDivElement>((() => {
        const hiddenDiv = document.createElement("div");
        hiddenDiv.style.display = 'none';
        hiddenDiv.style.whiteSpace = 'pre-wrap';
        hiddenDiv.style.wordBreak = 'break-word';
        return hiddenDiv;
    })())
    const [status, setStatus] = useState("💬")
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [value, setValue] = useState("")
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [
            {
                name: 'arrow',
                options: {
                    element: arrowElement
                }
            },
            {
                name: "offset",
                options: {
                    offset: [0, 8]
                }
            }
        ],

    });

    const handleTextAreaHeight = (content: string = "") => {
        if (!textareaRef.current) return;
        hiddenDivRef.current.innerHTML = content + '<br style="line-height: 3px;">';
        hiddenDivRef.current.style.visibility = 'hidden';
        hiddenDivRef.current.style.display = 'block'
        textareaRef.current.style.height = hiddenDivRef.current.offsetHeight + "px";
        hiddenDivRef.current.style.visibility = 'visible';
        hiddenDivRef.current.style.display = 'none'
    }

    const handleInput: FormEventHandler<HTMLTextAreaElement> = (event) => {
        let content = event.currentTarget.value;
        setValue(content);
        content = content.replace(/\n/g, '<br>');
        handleTextAreaHeight(content);
    }

    const handleShowPopover = () => {
        setPopoverVisible(true)
    }

    const handleSubmitPost = () => {
        if(!value) {
            return;
        }
        onSubmit?.(status, value.trim())
        setStatus("💬")
        setValue("")
        toast("Posted! 🥳");
    }

    useLayoutEffect(() => {
        textareaRef.current?.parentNode?.appendChild(hiddenDivRef.current);
        handleTextAreaHeight("")
    }, [])

    return <section className="rounded-lg bg-zinc-800 ring-1 ring-zinc-700 py-6 px-5">
        <h3 className="text-lg text-gray-300 font-medium mb-4">Create post</h3>
        <div className="p-4 pr-8 bg-zinc-900 rounded-lg flex items-start gap-4 focus-within:ring-1 focus-within:ring-blue-500">

            <span ref={setReferenceElement} className="text-lg leading-none p-4 rounded-full bg-zinc-800 h-12 w-12 inline-grid place-content-center select-none cursor-pointer transition-all hover:bg-zinc-700 hover:shadow-md hover:shadow-white/10" onClick={handleShowPopover}>
                {status}
            </span>
            <textarea
                ref={textareaRef}
                value={value}
                className="block my-auto flex-1 bg-inherit self-center resize-none overflow-hidden"
                placeholder="How are you feeling today?"
                onInput={handleInput}
            />
            {popoverVisible &&
                <div
                    ref={setPopperElement}
                    className="px-4 py-3 bg-zinc-800 rounded shadow-xl shadow-zinc-900 ring-2 ring-gray-900/10 flex gap-3"
                    style={styles.popper}
                    {...attributes.popper}
                >
                    {["💬", "👋", "😄", "😔", "😵"].map(_ =>
                        <span
                            key={_}
                            className="h-6 w-6 grid place-content-center text-lg select-none cursor-pointer rounded-full hover:shadow hover:shadow-white/10 hover:ring-2 hover:ring-zinc-900/20"
                            onClick={() => {
                                setStatus(_)
                                setPopoverVisible(false)
                            }}
                        >
                            {_}
                        </span>
                    )}
                    <div ref={setArrowElement} style={styles.arrow} />
                </div>
            }
        </div>
        <button className="block mt-4 w-[112px] ml-auto mr-0" onClick={handleSubmitPost} disabled={!value}>Post</button>
    </section>
}

export default CreatePostSection;