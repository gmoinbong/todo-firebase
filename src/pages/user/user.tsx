import { Profile } from '@/features'
import { TodoList } from '@/features/todo/ui/todo'
import { LogoutWidget } from '@/widgets/auth/logout'
import React from 'react'

export const UserPage = () => {
    return (
        <div>
            <Profile />
            <TodoList />
            <LogoutWidget />
        </div>
    )
}
