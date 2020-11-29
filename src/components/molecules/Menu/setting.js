import {
    iconFile,
    iconHome,
    iconMail,
    iconReport,
    iconUser
} from "../../../assets";

export const navAdmin = [
    { text: 'Dashboard', href: '/', icon: iconHome },
    { text: 'Report', href: '/report', icon: iconReport},
    { text: 'Message', href: '/message', icon: iconMail},
    { text: 'Profile', href: '/profile', icon: iconUser},
    { text: 'Master', href: '/master', icon: iconFile}

];

export const navHR = [
    { text: 'Dashboard', href: '/', icon: iconHome },
    { text: 'Employee', href: '/employee', icon: iconReport},
    { text: 'Report', href: '/report', icon: iconMail},
    { text: 'Setting', href: '/setting', icon: iconUser},
    { text: 'Master', href: '/master', icon: iconFile}
];