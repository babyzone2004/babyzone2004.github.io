import type { FC, ReactNode } from "react";
import React from "react";

type IProp = {
    title?: string,
    children: ReactNode
}

const Card: FC<IProp> = ({children}) => {
    console.log('Card');
    return (
        <>
            <div>
                {children}
            </div>
        </>
    )
}

export default Card;