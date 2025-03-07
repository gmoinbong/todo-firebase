import React from 'react'
import { Profile } from '@/features'
import { TodoList } from '@/features/todo/ui'
import { LogoutWidget } from '@/widgets/auth/logout'

export const UserPage = () => {
    return (
        <>
            <Profile />
            <TodoList />
            <LogoutWidget />
        </>
    )
}
