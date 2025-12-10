import { render, screen } from '@testing-library/react'
import Header from '../Header'
import { ThemeProvider } from '../ThemeProvider'

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

describe('Header', () => {
  it('renders navigation links', () => {
    renderWithTheme(<Header />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders logo/brand name', () => {
    renderWithTheme(<Header />)
    expect(screen.getByText('Utkarsh Singh')).toBeInTheDocument()
  })

  it('has skip to main content link', () => {
    renderWithTheme(<Header />)
    const skipLink = screen.getByText(/skip to main content/i)
    expect(skipLink).toBeInTheDocument()
  })
})

