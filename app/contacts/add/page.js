'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useContacts} from '@/app/ContactsContext';
import ContactForm from '@/app/ContactForm';

export default function AddContact() {
    const router = useRouter();
    const {contacts, setContacts} = useContacts();

    function handleSubmit(formData) {
        const newContact = {id: Date.now().toString(36), ...formData};
        setContacts([...contacts, newContact]);
        router.push('/');
    }

    useEffect(() => {
        document.title = 'All Contacts | Add Contact';
    }, []);

    return (
        <main>
            <h1>Add Contact</h1>
            <ContactForm
                onSubmit={handleSubmit}
                buttonText="Add Contact"
            />
        </main>
    );
}
