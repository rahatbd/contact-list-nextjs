'use client';

import {createContext, useContext, useState, useEffect} from 'react';
import initialContacts from './contacts.json';

const ContactsContext = createContext(null);

export function ContactsProvider({children}) {
    const [contacts, setContacts] = useState(initialContacts);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const lsContacts = localStorage.getItem('contacts');
            if (lsContacts) setContacts(JSON.parse(lsContacts));
        } catch (error) {
            console.error('Unable to load contacts from localStorage', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isLoading) return;
        try {
            localStorage.setItem('contacts', JSON.stringify(contacts));
        } catch (error) {
            console.error('Unable to save contacts to localStorage', error);
        }
    }, [isLoading, contacts]);

    return <ContactsContext.Provider value={{contacts, setContacts, isLoading}}>{children}</ContactsContext.Provider>;
}

export function useContacts() {
    const context = useContext(ContactsContext);
    if (!context) throw new Error('useContacts must be within a ContactsProvider');
    return context;
}
