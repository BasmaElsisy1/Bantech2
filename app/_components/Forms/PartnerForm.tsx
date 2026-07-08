'use client'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Image from "next/image";
import { useEffect, useState } from 'react';
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import * as Yup from 'yup';
import Upload from '../SVGs/Upload';
import ButtonComp from "../button";
import CustomSelect, { OptionType } from '../CustomSelect';
import { SectorsListProps } from '../MainPages/ApplyToPartner';

interface FormValues {
    sector_id: number
    name: string
    phone_number: string
    email: string
    company_url: string,
    country: string,
    vat_document: File | null
    cr_document: File | null
}

export default function PartnerForm({ SectorsList }: { SectorsList: SectorsListProps[] }
) {
    const [selectedCountry, setSelectedCountry] = useState<OptionType | null>(
        null
    );
    const [selectedCompany, setSelectedCompany] = useState<OptionType | null>(
        null
    );
    const [invalidFields, setInvalidFields] = useState<Set<string>>(new Set());

    const [submitted, setSubmitted] = useState(false)

    const initialValues: FormValues = {
        sector_id: 0,
        name: '',
        phone_number: '',
        email: '',
        company_url: '',
        country: '',
        vat_document: null,
        cr_document: null
    }

    const validationSchema = Yup.object({
        sector_id: Yup.number()
            .min(1, "Choose your sector please")
            .required("Choose your sector please"),

        name: Yup.string().required("Company name is required"),

        phone_number: Yup.string()
            .required("Phone number is required")
            .test(
                "is-valid-phone",
                "Invalid phone number",
                value => isValidPhoneNumber(value || "")
            ),

        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),

        company_url: Yup.string()
            .url("Enter a valid URL")
            .required("Company URL is required"),

        country: Yup.string().required("Country is required"),

        vat_document: Yup.mixed<File>()
            .required("Please upload the VAT document"),

        cr_document: Yup.mixed<File>()
            .required("Please upload the CR document"),
    });

    useEffect(() => {
        const option = document.querySelector('option[value="IL"]');
        option?.remove();
    }, []);

    const companyOptions: OptionType[] = SectorsList.map((sector) => ({
        label: sector.name,
        value: sector.name,          // string
        id: sector.id,               // number
    }));
    const handleCompanyChange = (
        option: OptionType | null,
        setFieldValue: any
    ) => {
        setSelectedCompany(option);

        setFieldValue("sector_id", option?.id ?? 0);
    };
    const handleSubmit = async (values: FormValues, { resetForm }: any) => {
        console.log("Submitted!", values);
        const formData = new FormData();
        formData.append("sector_id", values.sector_id.toString());
        formData.append("name", values.name);

        // Ensure phone always starts with +
        const phone = values.phone_number.startsWith("+") ? values.phone_number : `+${values.phone_number}`;
        formData.append("phone_number", phone);
        formData.append("company_url", values.company_url);
        formData.append("country", values.country);
        formData.append("email", values.email);

        if (values.vat_document) {
            formData.append("vat_document", values.vat_document, values.vat_document.name);
        }

        if (values.cr_document) {
            formData.append("cr_document", values.cr_document, values.cr_document.name);
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/partnership/submit`, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "*/*",
                    "Referer": "" // same as curl
                }
            });
            const text = await res.text();

            console.log("Status:", res.status);
            console.log("Response:", text);

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
        <div className="max-w-[800px] mx-auto mt-10 relative z-20">
            {!submitted ?
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue, values, errors }) => {
                        console.log(errors);

                        return (
                            <Form className="space-y-6">
                                <div className=' px-6 py-5 rounded-full bg-babyBlue/5 shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)] border border-white'>
                                    <h3 className=' uppercase text-primary text-base font-light'>Company Information</h3>
                                </div>
                                <div>
                                    <div className='flex md:flex-row flex-col gap-y-2 justify-between'>
                                        <label className="md:text-base text-sm md:py-5 py-2.5 bg-[#F5F5F5] text-primary md:w-[169px] w-full md:text-center text-start px-4 rounded-full">
                                            Company Name
                                        </label>
                                        <Field
                                            name="name"
                                            type="text"
                                            placeholder="Enter your company name"
                                            className="md:w-[calc(100%-186px)] w-full md:h-auto h-12 bg-[#F5F5F5] rounded-full px-4 outline-babyBlue placeholder:font-light placeholder:text-grey"
                                        />
                                    </div>
                                    <ErrorMessage name="name" component="p" className="text-red-500 text-sm mt-1" />
                                </div>
                                {/* Email */}
                                <div>
                                    <div className='flex md:flex-row flex-col gap-y-2 justify-between'>
                                        <label className="md:text-base text-sm md:py-5 py-2.5 bg-[#F5F5F5] text-primary md:w-[169px] w-full md:text-center text-start px-4 rounded-full">
                                            Business Email
                                        </label>
                                        <Field
                                            name="email"
                                            type="email"
                                            placeholder="yourmail@gmail.com"
                                            className="md:w-[calc(100%-186px)] w-full md:h-auto h-12 bg-[#F5F5F5] rounded-full px-4 outline-babyBlue placeholder:font-light placeholder:text-grey"
                                        />
                                    </div>
                                    <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
                                </div>
                                {/* Phone */}
                                <div>
                                    <div className='flex md:flex-row flex-col gap-y-2 justify-between'>
                                        <label className="md:text-base text-sm md:py-5 py-2.5 bg-[#F5F5F5] text-primary md:w-[169px] w-full md:text-center text-start px-4 rounded-full">
                                            Phone Number
                                        </label>

                                        <PhoneInput
                                            value={values.phone_number}
                                            onChange={(value) => setFieldValue("phone_number", value)}
                                            international
                                            defaultCountry="EG"
                                            placeholder="Enter your phone number"
                                            className="md:w-[calc(100%-186px)]  w-full md:h-auto h-12 placeholder:font-light placeholder:text-grey"
                                        />
                                    </div>
                                    <ErrorMessage name="phone_number" component="p" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div>
                                    <div className='flex md:flex-row flex-col gap-y-2 justify-between'>
                                        <label className="md:text-base text-sm md:py-5 py-2.5 bg-[#F5F5F5] text-primary md:w-[169px] w-full md:text-center text-start px-4 rounded-full">
                                            Company URL
                                        </label>
                                        <Field
                                            name="company_url"
                                            type="text"
                                            placeholder="Enter your company url"
                                            className="md:w-[calc(100%-186px)] w-full md:h-auto h-12 bg-[#F5F5F5] rounded-full px-4 outline-babyBlue placeholder:font-light placeholder:text-grey"
                                        />
                                    </div>
                                    <ErrorMessage name="company_url" component="p" className="text-red-500 text-sm mt-1" />
                                </div>
                                {/* Country */}
                                <div className="flex md:flex-row gap-4 md:gap-0 flex-col items-center justify-between w-full">
                                    <label className="bg-[#F5F5F5] rounded-full px-5 py-[15px] text-[#212C66] md:w-[169px] w-full text-base">
                                        Country
                                    </label>
                                    <div className="md:w-[calc(100%-185px)] w-full">
                                        <CustomSelect
                                            isCountry={true}
                                            value={selectedCountry}
                                            onChange={(option) => {
                                                setSelectedCountry(option);
                                                setFieldValue(
                                                    "country",
                                                    option?.value || ""
                                                );
                                                setInvalidFields((prev) => {
                                                    const next = new Set(prev);
                                                    next.delete("company_country");
                                                    return next;
                                                });
                                            }}
                                            placeholder="Choose a country"
                                            className={
                                                invalidFields.has("company_country")
                                                    ? "border-red-500 border-2"
                                                    : ""
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Company Field */}
                                <div className="flex md:flex-row gap-4 md:gap-0 flex-col items-center justify-between w-full">
                                    <label className="bg-[#F5F5F5] rounded-full px-5 py-[15px] text-[#212C66] md:w-[169px] w-full text-base">
                                        Company Field
                                    </label>
                                    <div className="md:w-[calc(100%-185px)] w-full">
                                        <CustomSelect
                                            options={companyOptions}
                                            value={selectedCompany}
                                            onChange={(option) =>
                                                handleCompanyChange(option, setFieldValue)
                                            }
                                            placeholder="Select a company"
                                            width="w-full"
                                            className={
                                                invalidFields.has("company_field")
                                                    ? "border-red-500 border rounded-full"
                                                    : ""
                                            }
                                        />
                                    </div>
                                </div>
                                <div className=' !mt-14 px-6 py-5 rounded-full bg-babyBlue/5 shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)] border border-white'>
                                    <h3 className=' uppercase text-primary text-base font-light'>Documents</h3>
                                </div>
                                <div>
                                    <div className='flex md:flex-row flex-col gap-y-2 justify-between'>
                                        <label className="md:text-base text-sm md:py-5 py-2.5 bg-[#F5F5F5] text-primary md:w-[169px] w-full md:text-center text-start px-4 rounded-full">
                                            VAT or TAX
                                        </label>

                                        <div className="md:w-[calc(100%-186px)] w-full md:h-auto h-12 flex items-center justify-between relative bg-[#F5F5F5] rounded-full px-4">

                                            <input
                                                id="vat_document"
                                                name="vat_document"
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                onChange={(e) =>
                                                    setFieldValue(
                                                        "vat_document",
                                                        e.currentTarget.files?.[0] || null
                                                    )
                                                }
                                                className="absolute w-full h-full inset-0 opacity-0 cursor-pointer"
                                            />

                                            {values.vat_document ? (
                                                <p className="text-sm text-primary">{values.vat_document.name}</p>
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

                                    <ErrorMessage name="vat_document" component="p" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div>
                                    <div className='flex md:flex-row flex-col gap-y-2 justify-between'>
                                        <label className="md:text-base text-sm md:py-5 py-2.5 bg-[#F5F5F5] text-primary md:w-[169px] w-full md:text-center text-start px-4 rounded-full">
                                            TL or CR
                                        </label>

                                        <div className="md:w-[calc(100%-186px)] w-full md:h-auto h-12 flex items-center justify-between relative bg-[#F5F5F5] rounded-full px-4">

                                            <input
                                                id="cr_document"
                                                name="cr_document"
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                onChange={(e) =>
                                                    setFieldValue(
                                                        "cr_document",
                                                        e.currentTarget.files?.[0] || null
                                                    )
                                                }
                                                className="absolute w-full h-full inset-0 opacity-0 cursor-pointer"
                                            />

                                            {values.cr_document ? (
                                                <p className="text-sm text-primary">{values.cr_document.name}</p>
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

                                    <ErrorMessage name="cr_document" component="p" className="text-red-500 text-sm mt-1" />
                                </div>

                                <ButtonComp text={"Submit Your Request"} white center type="submit" />

                            </Form>
                        )
                    }}
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
