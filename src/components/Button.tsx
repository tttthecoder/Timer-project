import { type ComponentPropsWithoutRef } from "react";


type AnchorProps =  ComponentPropsWithoutRef<'a'> 
type ButtonProps =  ComponentPropsWithoutRef<'button'> & {
    href?: never
}

function isAnchorProps(props: AnchorProps | ButtonProps) : props is AnchorProps { 
    return 'href' in props;
}
export function Button(props: AnchorProps | ButtonProps) {
    if (isAnchorProps(props)) {
        return <a className="button" {...props} ></a>
    }
    return <button className="button" {...props}></button>;
}