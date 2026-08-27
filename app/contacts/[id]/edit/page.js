'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useContacts} from '@/app/ContactsContext';
import Link from 'next/link';
import ContactForm from '@/app/ContactForm';

export default function EditContact({params}) {
    const router = useRouter();
    const {contacts, setContacts} = useContacts();

    const contact = contacts.find(contact => contact.id === params.id);

    function handleSubmit(formData) {
        const updatedContact = {id: contact.id, ...formData};
        setContacts(contacts.map(contact => (contact.id === params.id ? updatedContact : contact)));
        router.push(`/contacts/${params.id}`);
    }

    useEffect(() => {
        document.title = 'All Contacts | Edit Contact';
    }, []);

    return (
        <main>
            <h1>Edit Contact</h1>
            {contact ? (
                <ContactForm
                    initialData={{
                        name: contact.name,
                        image_url: contact.image_url,
                        email: contact.email,
                        phone: contact.phone,
                    }}
                    onSubmit={handleSubmit}
                    buttonText="Update Contact"
                    isEditing
                />
            ) : (
                <>
                    <Link
                        href="/"
                        className="link"
                    >
                        ← Back
                    </Link>
                    <p>No contact found.</p>
                </>
            )}
        </main>
    );
}
