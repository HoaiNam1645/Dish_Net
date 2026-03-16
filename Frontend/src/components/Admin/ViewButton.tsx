import Link from 'next/link';
import React from 'react';

interface ViewButtonBaseProps {
    label?: string;
}

interface ViewButtonWithHref extends ViewButtonBaseProps {
    href: string;
    onClick?: never;
}

interface ViewButtonWithOnClick extends ViewButtonBaseProps {
    href?: never;
    onClick: () => void;
}

type ViewButtonProps = ViewButtonWithHref | ViewButtonWithOnClick;

const btnClass = 'px-4 py-1.5 rounded-md bg-green-500 hover:bg-green-600 text-white text-xs font-semibold transition-colors inline-block cursor-pointer';

export default function ViewButton({ href, onClick, label = 'Xem' }: ViewButtonProps) {
    if (href) {
        return (
            <Link href={href} className={btnClass}>
                {label}
            </Link>
        );
    }
    return (
        <button onClick={onClick} className={btnClass}>
            {label}
        </button>
    );
}
