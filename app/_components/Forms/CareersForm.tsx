'use client'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Image from "next/image";
import { useEffect, useState } from 'react';
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import * as Yup from 'yup';
import Upload from '../SVGs/Upload';
import ButtonComp from "../button";

interface FormValues {
    first_name: string
    last_name: string
    phone: string
    email: string
    cv: File | null
}

export default function CareersForm({
    data,
    careerID,
    slug
}: {
    data: {
        title: string
        button: { text: string }
    }
    careerID: number
    slug: string
}) {

    const [submitted, setSubmitted] = useState(false)

    const initialValues: FormValues = {
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        cv: null
    }

    const validationSchema = Yup.object({
        first_name: Yup.string().required('First name is required'),
        last_name: Yup.string().required('Last name is required'),
        phone: Yup.string()
            .required("Phone number is required")
            .test("is-valid-phone", "Invalid phone number", (value) =>
                isValidPhoneNumber(value || "")
            ),
        email: Yup.string().email('Invalid email').required('Email is required'),
        cv: Yup.mixed().required('Please upload your CV')
    })

    useEffect(() => {
        const option = document.querySelector('option[value="IL"]');
        option?.remove();
    }, []);


    const handleSubmit = async (values: FormValues, { resetForm }: any) => {
        const formData = new FormData();
        formData.append("first_name", values.first_name);
        formData.append("last_name", values.last_name);

        // Ensure phone always starts with +
        const phone = values.phone.startsWith("+") ? values.phone : `+${values.phone}`;
        formData.append("phone", phone);

        formData.append("email", values.email);
        formData.append("career_id", careerID.toString());

        if (values.cv) {
            formData.append("cv", values.cv, values.cv.name);
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/careers/${slug}/apply`, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "*/*",
                    "Referer": "" // same as curl
                }
            });

            if (!res.ok) {
                console.error("Failed:", await res.text());
                return;
            }

            setSubmitted(true);
            resetForm();

        } catch (error) {
            console.error("Submission error:", error);
        }
    };


    return (
        <div className="max-w-[800px] mx-auto mt-10">
            <h2 className="text-primary text-center md:text-[40px] text-2xl font-bold mb-8">
                {data.title}
            </h2>
            {!submitted ?
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue, values }) => (
                        <Form className="space-y-6">

                            {/* First name */}
                            <div>
                                <div className='flex md:flex-row flex-col gap-y-2 justify-between'>
                                    <label className="md:text-base text-sm md:py-5 py-2.5 bg-lightWhite text-primary md:w-[169px] w-full md:text-center text-start px-4 rounded-full">
                                        First Name
                                    </label>
                                    <Field
                                        name="first_name"
                                        type="text"
                                        placeholder="Enter your first name"
                                        className="md:w-[calc(100%-186px)] w-full md:h-auto h-12 bg-lightWhite rounded-full px-4 outline-babyBlue placeholder:font-light placeholder:text-grey"
                                    />
                                </div>
                                <ErrorMessage name="first_name" component="p" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Last name */}
                            <div>
                                <div className='flex md:flex-row flex-col gap-y-2 justify-between'>
                                    <label className="md:text-base text-sm md:py-5 py-2.5 bg-lightWhite text-primary md:w-[169px] w-full md:text-center text-start px-4 rounded-full">
                                        Last Name
                                    </label>
                                    <Field
                                        name="last_name"
                                        type="text"
                                        placeholder="Enter your last name"
                                        className="md:w-[calc(100%-186px)] w-full md:h-auto h-12 placeholder:font-light placeholder:text-grey bg-lightWhite rounded-full px-4 outline-babyBlue"
                                    />
                                </div>
                                <ErrorMessage name="last_name" component="p" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Phone */}
                            <div>
                                <div className='flex md:flex-row flex-col gap-y-2 justify-between'>
                                    <label className="md:text-base text-sm md:py-5 py-2.5 bg-lightWhite text-primary md:w-[169px] w-full md:text-center text-start px-4 rounded-full">
                                        Phone
                                    </label>

                                    <PhoneInput
                                        value={values.phone}
                                        onChange={(value) => setFieldValue("phone", value)}
                                        international
                                        defaultCountry="EG"
                                        placeholder="Enter your phone number"
                                        className="md:w-[calc(100%-186px)] w-full md:h-auto h-12 placeholder:font-light placeholder:text-grey"
                                    />
                                </div>
                                <ErrorMessage name="phone" component="p" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Email */}
                            <div>
                                <div className='flex md:flex-row flex-col gap-y-2 justify-between'>
                                    <label className="md:text-base text-sm md:py-5 py-2.5 bg-lightWhite text-primary md:w-[169px] w-full md:text-center text-start px-4 rounded-full">
                                        Email
                                    </label>
                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder="yourmail@gmail.com"
                                        className="md:w-[calc(100%-186px)] w-full md:h-auto h-12 bg-lightWhite rounded-full px-4 outline-babyBlue placeholder:font-light placeholder:text-grey"
                                    />
                                </div>
                                <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <div className='flex md:flex-row flex-col gap-y-2 justify-between'>
                                    <label className="md:text-base text-sm md:py-5 py-2.5 bg-lightWhite text-primary md:w-[169px] w-full md:text-center text-start px-4 rounded-full">
                                        Upload Resume
                                    </label>

                                    <div className="md:w-[calc(100%-186px)] w-full md:h-auto h-12 flex items-center justify-between relative bg-lightWhite rounded-full px-4">

                                        <input
                                            id="cv"
                                            name="cv"
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) =>
                                                setFieldValue("cv", e.currentTarget.files?.[0] || null)
                                            }
                                            className="absolute w-full h-full inset-0 opacity-0 cursor-pointer"
                                        />

                                        {values.cv ? (
                                            <p className="text-sm text-primary">{values.cv.name}</p>
                                        ) : (
                                            <>
                                                <div className="flex gap-3 items-center">
                                                    <span className="w-8 h-8 block"><Upload /></span>
                                                    <p className="text-sm text-grey">Click to upload</p>
                                                </div>
                                                <p className="text-sm text-grey">
                                                    PDF or DOC (Max 5MB)
                                                </p>
                                            </>
                                        )}

                                    </div>
                                </div>

                                <ErrorMessage name="cv" component="p" className="text-red-500 text-sm mt-1" />
                            </div>

                            <input type="hidden" name="career_id" value={careerID} />

                            <ButtonComp text={data.button.text} white center type="submit" />

                        </Form>
                    )}
                </Formik>
                :
                <div className="border border-white  rounded-[80px] md:py-[127px] py-[60px] md:space-y-16 space-y-8 w-full px-4 backdrop-blur-xl shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)]">
                    <div className="relative md:w-[400px] w-[200px] aspect-square mx-auto">
                        <Image src={'/Images/success.png'} alt="success" fill />
                    </div>
                    <div className=" space-y-6">
                        <h3 className="text-primary md:text-4xl text-2xl font-semibold text-center">We’ve Received Your Application</h3>
                        <p className="text-primary md:text-xl text-base font-light text-center ">We’ve received your request and one of our experts will contact you soon. In the meantime, feel free to explore more about what we offer.</p>
                    </div>

                </div>
            }

        </div>
    )
}
