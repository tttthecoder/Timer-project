import { ReactNode, type ElementType, ComponentPropsWithoutRef } from "react"



type ContainerProps<T extends ElementType> = {
    as?: T,
    children: ReactNode
} & ComponentPropsWithoutRef<T>



export default function Container<C extends ElementType>(props: ContainerProps<C>) {
    const Component = props.as || 'div';
    return <Component {...props}> {props.children} </Component>
}