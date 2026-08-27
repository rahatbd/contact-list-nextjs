'use client';

import {useState, useEffect} from 'react';
import {useContacts} from './ContactsContext';
import Link from 'next/link';
import styles from './page.module.css';

export default function AllContacts() {
    const [search, setSearch] = useState('');
    const [deleteContact, setDeleteContact] = useState(null);
    const {contacts, setContacts, isLoading} = useContacts();

    const query = search.trim().toLowerCase();
    const filteredContacts = contacts.filter(({name}) => name.toLowerCase().includes(query));

    function highlight(name) {
        if (!query) return name;
        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return name
            .split(new RegExp(`(${escapedQuery})`, 'gi'))
            .map((part, index) => (part.toLowerCase() === query ? <mark key={index}>{part}</mark> : part));
    }

    function handleDelete() {
        document.startViewTransition(() => setContacts(contacts.filter(contact => contact.id !== deleteContact.id)));
    }

    useEffect(() => {
        document.title = 'Contacts';
    }, []);

    return (
        <main>
            <h1>All Contacts</h1>
            <Link
                href="/contacts/add"
                className="link"
            >
                + Add Contact
            </Link>
            <search>
                <input
                    type="search"
                    aria-label="Search contacts"
                    placeholder="Search contacts"
                    value={search}
                    onChange={event => setSearch(event.target.value)}
                    className={styles.input}
                />
            </search>
            {isLoading ? (
                <p>Loading contacts...</p>
            ) : (
                <div className={styles.contacts}>
                    {filteredContacts.length > 0 && (
                        <div className={styles.headings}>
                            <span></span>
                            <span>Photo</span>
                            <span>Name</span>
                            <span>Email</span>
                            <span>Phone</span>
                        </div>
                    )}
                    {filteredContacts.length > 0 ? (
                        filteredContacts.map(contact => (
                            <article
                                key={contact.id}
                                className={styles.contact}
                            >
                                <button
                                    aria-label={`Delete ${contact.name}`}
                                    command="show-modal"
                                    commandfor="delete-dialog"
                                    onClick={() => setDeleteContact(contact)}
                                >
                                    &times; Delete
                                </button>
                                <img
                                    src={contact.image_url}
                                    alt=""
                                    width={60}
                                    height={60}
                                    loading="lazy"
                                    onError={event => (event.currentTarget.src = 'https://i.pravatar.cc/60?img=39')}
                                />
                                <Link href={`/contacts/${contact.id}`}>{highlight(contact.name)}</Link>
                                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                                <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                                <Link
                                    aria-label={`Edit ${contact.name}`}
                                    href={`/contacts/${contact.id}/edit`}
                                >
                                    ✎ Edit
                                </Link>
                            </article>
                        ))
                    ) : (
                        <p className={styles.noContact}>No contact found.</p>
                    )}
                </div>
            )}
            <dialog
                aria-labelledby="delete-dialog-title"
                id="delete-dialog"
                className={styles.dialog}
                onClose={() => setDeleteContact(null)}
            >
                <h2 id="delete-dialog-title">Delete Contact</h2>
                <p>
                    Are you sure you want to delete <strong>{deleteContact?.name}</strong>?
                </p>
                <button
                    command="close"
                    commandfor="delete-dialog"
                >
                    Cancel
                </button>
                <button
                    command="close"
                    commandfor="delete-dialog"
                    onClick={handleDelete}
                >
                    ❌ Delete
                </button>
            </dialog>
        </main>
    );
}
