import {ContactsProvider} from './ContactsContext';
import {Inter} from 'next/font/google';
import './globals.css';

const inter = Inter({subsets: ['latin']});

export const metadata = {
    title: 'Contacts',
};

export const viewport = {
    colorScheme: 'light dark',
};

export default function RootLayout({children}) {
    return (
        <html lang="en-CA">
            <body className={inter.className}>
                <ContactsProvider>{children}</ContactsProvider>
            </body>
        </html>
    );
}
