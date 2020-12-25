import {
    iconAsset,
    iconEmployee,
    iconFile,
    iconHome,
    iconTask,
    iconMasterData,
    iconReport,
    iconSetting,
    iconHistory
} from "../../../assets";

export const navAdmin = [
    { text: 'Dashboard', href: '/', icon: iconHome },
    { text: 'Modul Karyawan', href: '/employee', icon: iconEmployee},
    { text: 'Modul Aset', href: '/asset', icon: iconAsset},
    { text: 'Master Data', href: '/master', icon: iconMasterData},
    { text: 'Pengaturan', href: '/setting', icon: iconSetting}

];

export const navHR = [
    { text: 'Dashboard', href: '/', icon: iconHome },
    { text: 'Karyawan', href: '/employee', icon: iconEmployee},
    { text: 'Laporan', href: '/report', icon: iconReport},
    { text: 'Tugas', href: '/task', icon: iconTask},
    { text: 'Pengaturan', href: '/setting', icon: iconSetting}
];