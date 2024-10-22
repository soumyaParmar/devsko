import { MaterialIconType } from '@/utils/types/materialicon';
import React, { MouseEventHandler } from 'react'

export enum IconButtonType {
    DARK,
    LIGHT
}
interface IconButtonProps {
    Icon: MaterialIconType
    onClick: MouseEventHandler<HTMLElement>
    type: IconButtonType
}

const IconButton: React.FC<IconButtonProps> = ({ Icon, onClick, type }) => {
    const dynClass = (() => {
        switch (type) {
            case IconButtonType.LIGHT:
                return 'bg-[#F9F9F9]  border-[#EFEFF4]';
            case IconButtonType.DARK:
                return ''
        }
    })();
    return (
        <div className={`flex justify-center h-auto w-auto ${dynClass} rounded-full p-2 border-[2px]`} onClick={onClick}>
            <Icon sx={{ color: '#292D32' }} />
        </div>
    )
}

export default IconButton