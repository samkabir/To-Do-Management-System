import TrashIcon from './TrashIcon.svg?react';
import CalendarIcon from './CalendarIcon.svg?react';
import CrossIcon from './CrossIcon.svg?react';
import HamburgerIcon from './HamburgerIcon.svg?react';
import ArrowDown from './ArrowDown.svg?react';

const iconMap = {
    TrashIcon,
    CalendarIcon,
    HamburgerIcon,
    CrossIcon,
    ArrowDown
};

export function GetIcon({ name, className = '' }) {
    const IconComponent = iconMap[name];
    if (!IconComponent) {
        console.warn(`Icon "${name}" not found.`);
        return null;
    }

    return <IconComponent className={className} />;
}