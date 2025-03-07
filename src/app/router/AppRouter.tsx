import React, { FC } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import App from '../App'

export const AppRouter: FC = () => {
    return (
        <BrowserRouter>
            <Route Component={App} />
        </BrowserRouter>
    )
}