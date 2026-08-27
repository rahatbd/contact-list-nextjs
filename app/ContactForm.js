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

export default function ContactForm({initialData = initialFormData, isEmailDuplicate, isPhoneDuplicate, onSubmit, buttonText, isEditing = false}) {
    const [formData, setFormData] = useState(initialData);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);

    const isValid = Object.values(formData).every(value => value.trim() !== '');
    const isDirty = !isEditing || JSON.stringify(initialData) !== JSON.stringify(formData);
    const hasErrors = emailError || phoneError;

    function handleChange(event) {
        const {id, value} = event.target;
        setFormData({...formData, [id]: value});
        if (id === 'email') return setEmailError(isEmailDuplicate(value));
        if (id === 'phone') setPhoneError(isPhoneDuplicate(value));
    }

    function handleSubmit(event) {
        event.preventDefault();
        onSubmit(formData);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={styles.form}
        >
            <div className={styles.field}>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="image_url">Image URL</label>
                <input
                    type="url"
                    id="image_url"
                    placeholder="Enter image URL"
                    value={formData.image_url}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    aria-describedby={emailError ? 'email-error' : undefined}
                    aria-invalid={emailError}
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                {emailError && (
                    <small
                        id="email-error"
                        role="alert"
                    >
                        Email already exists.
                    </small>
                )}
            </div>
            <div className={styles.field}>
                <label htmlFor="phone">Phone</label>
                <input
                    type="tel"
                    id="phone"
                    placeholder="437-555-0000"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    aria-describedby={phoneError ? 'phone-error' : undefined}
                    aria-invalid={phoneError}
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                {phoneError && (
                    <small
                        id="phone-error"
                        role="alert"
                    >
                        Phone already exists.
                    </small>
                )}
            </div>
            <small>All fields are required.</small>
            <button disabled={!isValid || !isDirty || hasErrors}>{buttonText}</button>
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
    isEmailDuplicate: PropTypes.func.isRequired,
    isPhoneDuplicate: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
    isEditing: PropTypes.bool,
};
