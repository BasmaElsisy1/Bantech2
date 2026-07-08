'use client'
import React, { useState, FormEvent } from 'react';
import ButtonComp from '../button';

export default function NewsLetterForm() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('https://portal.bantech.ae/api/newsletter/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setSubmitStatus({
                    success: true,
                    message: 'Successfully subscribed!',
                });
                setEmail('');
            } else {
                setSubmitStatus({
                    success: false,
                    message:
                        result.message ||
                        ('Email already exists'),
                });
            }
        } catch (error) {
            console.error('Newsletter submission error:', error);
            setSubmitStatus({
                success: false,
                message: 'Connection error',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='max-w-[800px] mx-auto'>
            {submitStatus && submitStatus.success ? (
                <p className="text-primary text-center md:text-lg text-sm">{submitStatus.message}</p>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="relative flex md:flex-row flex-col justify-between gap-4 w-full"
                >
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourmail@gmail.com"
                        className="md:w-[calc(100%-256px)] w-full placeholder:font-light placeholder:text-grey bg-lightwhite2 rounded-full md:py-5 md:px-7 p-4 md:text-base text-xs text-black7 placeholder:text-black7 focus:outline-none"
                        required
                    />
                    <div className="md:w-[240px] w-full">
                        <ButtonComp
                            text="Subscribe"
                            white
                            type="submit"
                        />
                    </div>
                </form>
            )}
            {submitStatus && !submitStatus.success && (
                <p className="text-red-700 text-sm ms-1 mt-1">{submitStatus.message}</p>
            )}
        </div>
    );
}
