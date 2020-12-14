import React, { useEffect, useState } from 'react'
import { greeting } from '../../../../utils/helpers/greeting'
import { HeaderContentContainer, Row } from '../../../atoms'
import ProfileMenu from '../../ProfileMenu'
import UserPageTitle from '../UserPageTitle'

const DashboardHeader = ({ name, photo }) => {
    const [title, setTitle] = useState('');
    useEffect(() => {
        setTitle(greeting())
        // console.log(greeting())
    }, []);
    return (
        <HeaderContentContainer>
            <UserPageTitle title={title} name={name} />
            <ProfileMenu name={name} photo={photo} />
        </HeaderContentContainer>
    )
}

export default DashboardHeader
