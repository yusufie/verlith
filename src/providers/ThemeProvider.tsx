"use client";

import { ThemeProvider } from 'next-themes'

type Props = {
	children?: React.ReactNode;
};

const Provider = ({ children }: Props) => {
	return <ThemeProvider attribute="data-theme">{children}</ThemeProvider>;
};

export default Provider;