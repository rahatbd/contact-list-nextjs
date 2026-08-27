'use client';

import {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

const initialFormData = {
    name: '',
    image_url: 'https://i.pravatar.cc/150?img=39',
    email: '',
    phone: '',
};

export default function ContactForm({initialData = initialFormData, onSubmit, buttonText, isEditing = false}) {
    const [formData, setFormData] = useState(initialData);

    const isValid = Object.values(formData).every(value => value.trim() !== '');
    const isDirty = !isEditing || JSON.stringify(initialData) !== JSON.stringify(formData);

    function handleSubmit(event) {
        event.preventDefault();
        onSubmit(formData);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={styles.form}
        >
            <div className={styles.input}>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={event => setFormData({...formData, name: event.target.value})}
                    required
                />
            </div>
            <div className={styles.input}>
                <label htmlFor="image">Image URL</label>
                <input
                    type="url"
                    id="image"
                    placeholder="Enter image URL"
                    value={formData.image_url}
                    onChange={event => setFormData({...formData, image_url: event.target.value})}
                    required
                />
            </div>
            <div className={styles.input}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={event => setFormData({...formData, email: event.target.value})}
                    required
                />
            </div>
            <div className={styles.input}>
                <label htmlFor="phone">Phone</label>
                <input
                    type="tel"
                    id="phone"
                    placeholder="437-555-0000"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    value={formData.phone}
                    onChange={event => setFormData({...formData, phone: event.target.value})}
                    required
                />
            </div>
            <small>All fields are required.</small>
            <button
                className={styles.button}
                disabled={!isValid || !isDirty}
            >
                {buttonText}
            </button>
        </form>
    );
}

ContactForm.propTypes = {
    initialData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image_url: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
    }),
    onSubmit: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
    isEditing: PropTypes.bool,
};
