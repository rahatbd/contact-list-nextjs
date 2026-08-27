'use client';

import {useEffect} from 'react';
import {useContacts} from '@/app/ContactsContext';
import Link from 'next/link';
import styles from './page.module.css';

export default function ViewContact({params}) {
    const {contacts} = useContacts();

    const contact = contacts.find(contact => contact.id === params.id);

    useEffect(() => {
        document.title = `Contacts | ${contact?.name || 'View Contact'}`;
    }, [contact]);

    return (
        <main className={styles.contact}>
            <h1>View Contact</h1>
            <div>
                <Link href="/">← Back</Link>
                {contact && (
                    <Link
                        href={`/contacts/${contact.id}/edit`}
                        className={styles.link}
                    >
                        Edit →
                    </Link>
                )}
            </div>
            {contact ? (
                <>
                    <h2>{contact.name}</h2>
                    <img
                        src={contact.image_url}
                        alt=""
                        width={300}
                        height={300}
                        onError={event => (event.currentTarget.src = 'https://i.pravatar.cc/60?img=39')}
                    />
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                    <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                </>
            ) : (
                <p>No contact found.</p>
            )}
        </main>
    );
}
