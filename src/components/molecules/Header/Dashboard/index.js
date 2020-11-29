import React, { useEffect, useState } from 'react'
import { greeting } from '../../../../utils/helpers/greeting'
import { Row } from '../../../atoms'
import ProfileMenu from '../../ProfileMenu'
import UserPageTitle from '../UserPageTitle'

const DashboardHeader = ({ name, photo }) => {
    const [title, setTitle] = useState('');
    useEffect(() => {
        setTitle(greeting())
        // console.log(greeting())
    }, []);
    return (
        <Row>
            <UserPageTitle title={title} />
            <ProfileMenu name={name} photo={photo} />
        </Row>
    )
}

export default DashboardHeader
