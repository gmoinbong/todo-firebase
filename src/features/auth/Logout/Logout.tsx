import { Button } from '@/shared/ui'
import React, { FC } from 'react'

export const Logout: FC = () => {
    return (
        <Button
            text='Logout'
            onClick={() => console.log('Logout')}
        />
    )
}