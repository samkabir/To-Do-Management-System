import TrashIcon from './TrashIcon.svg?react';
import CalendarIcon from './CalendarIcon.svg?react';
import CrossIcon from './CrossIcon.svg?react';
import HamburgerIcon from './HamburgerIcon.svg?react';
import ArrowDown from './ArrowDown.svg?react';
import SolidCalendarIcon from './SolidCalendarIcon.svg?react';
import CreateIcon from './CreateIcon.svg?react';
import DoneIcon from './DoneIcon.svg?react';
import NewIcon from './NewIcon.svg?react';
import OnGoingIcon from './OnGoingIcon.svg?react';
import HorizontalDotsIcon from './HorizontalDotsIcon.svg?react';
import EditIcon from './EditIcon.svg?react';
import OverDueIcon from './OverDueIcon.svg?react';

const iconMap = {
    TrashIcon,
    CalendarIcon,
    HamburgerIcon,
    CrossIcon,
    ArrowDown,
    SolidCalendarIcon,
    CreateIcon,
    DoneIcon,
    NewIcon,
    OnGoingIcon,
    HorizontalDotsIcon,
    EditIcon,
    OverDueIcon
};

export function GetIcon({ name, className = '' }) {
    const IconComponent = iconMap[name];
    if (!IconComponent) {
        console.warn(`Icon "${name}" not found.`);
        return null;
    }

    return <IconComponent className={className} />;
}