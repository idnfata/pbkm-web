import React from 'react'
import { TextLink } from './textlink.elements'

const Link = ({title, onClick, to}) => {
    return (
        <TextLink onClick={onClick} to={to}>
            {title}
        </TextLink>
    )
}

export default Link
