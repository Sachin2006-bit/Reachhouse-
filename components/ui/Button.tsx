import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>
type ButtonElementProps = React.ButtonHTMLAttributes<HTMLButtonElement>

interface ButtonProps extends ButtonElementProps {
  variant?: 'primary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  target?: AnchorProps['target']
  rel?: AnchorProps['rel']
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', href, target, rel, className, children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 rounded-full font-inter font-medium transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--rh-blue)] focus-visible:outline-offset-2'
    const variants = {
      primary:
        'bg-[var(--rh-blue)] text-white hover:bg-[var(--rh-blue-hover)] hover:[box-shadow:0_8px_32px_-8px_rgba(31,96,253,0.45)]',
      ghost:
        'border border-[var(--rh-border)] text-[var(--rh-text)] hover:border-[var(--rh-blue)] hover:text-white bg-transparent',
    }
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    }
    const cls = cn(base, variants[variant], sizes[size], className)

    if (href) {
      const isExternal = href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')
      return (
        <a
          href={href}
          className={cls}
          target={target ?? (isExternal ? '_blank' : undefined)}
          rel={rel ?? (isExternal ? 'noopener noreferrer' : undefined)}
          onClick={(props as AnchorProps).onClick as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {children}
        </a>
      )
    }
    return (
      <button ref={ref} className={cls} {...props}>
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
