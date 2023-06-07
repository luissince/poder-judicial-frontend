import { useRef } from "react";

type Props = {
    open: boolean,
    element: HTMLDivElement,
    children: React.ReactNode,
}

export const onEventToggleModal = (props: Props) => {
    if (props.open) {
        return;
    }

    // setOpen(true)

    const element = props.element as HTMLDivElement;

    if (element.classList.contains("animate-out")) {

        element.classList.remove("animate-out");
        element.classList.remove("!block");

        element.classList.add("animate-in");
        element.classList.add("!block");
    } else if (element.classList.contains("animate-in")) {
        element.classList.remove("animate-in");
        element.classList.remove("!block");

        element.classList.add("animate-out");
        element.classList.add("!block");
    } else {
        element.classList.add("animate-in");
        element.classList.add("!block");
    }

    const onEventAnimationEnd = () => {
        if (element.classList.contains("animate-out")) {
            element.classList.remove("animate-out");
            element.classList.remove("!block");
        }
        // setOpen(false)
    }

    element.removeEventListener('animationend', onEventAnimationEnd);
    element.addEventListener('animationend', onEventAnimationEnd);
}


const Transition = (props: Props) => {

    const ref = useRef<HTMLDivElement>(null);

    return (
        <div ref={ref} className={`fixed inset-0 z-[500] w-screen h-screen  hidden `}>
            {props.children}
        </div>
    );
}

export default Transition;