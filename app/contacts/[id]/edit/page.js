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

    function isEmailDuplicate(email) {
        return contacts.some(contact => contact.id !== params.id && contact.email.trim().toLowerCase() === email.trim().toLowerCase());
    }

    function isPhoneDuplicate(phone) {
        return contacts.some(contact => contact.id !== params.id && contact.phone === phone);
    }

    function handleSubmit(formData) {
        const updatedContact = {id: contact.id, ...formData};
        setContacts(contacts.map(contact => (contact.id === params.id ? updatedContact : contact)));
        router.push(`/contacts/${params.id}`);
    }

    useEffect(() => {
        document.title = `Contacts | ${contact?.name || 'Edit Contact'}`;
    }, [contact]);

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
                    isEmailDuplicate={isEmailDuplicate}
                    isPhoneDuplicate={isPhoneDuplicate}
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
