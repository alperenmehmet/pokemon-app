import {render, screen} from '@testing-library/react'
import Header from "./Header";
import {BrowserRouter} from "react-router-dom";
import '@testing-library/jest-dom'

test('renders the header', () => {
    render(
        <BrowserRouter>
            <Header/>
        </BrowserRouter>
    )

    const favouritesLink = screen.getByText(/favourites/i)
    expect(favouritesLink).toBeInTheDocument()

    const link = screen.getByRole('link', { name: /favourites/i });
    expect(link.getAttribute('href')).toBe('/favourites');
})