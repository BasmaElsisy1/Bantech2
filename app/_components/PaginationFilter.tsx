
interface Props {
    page: number,
    totalPages: number,
    setPage: (page: number) => void
}

export default function PaginationFilter({ page, totalPages, setPage }: Props) {

    return (
        <div className="flex md:gap-4 gap-3 mt-10 justify-center items-center">
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={` text-center  rounded-full border border-white  transition-all duration-500 ${page === i + 1 ? "bg-white md:w-16 md:h-16 w-12 h-12 md:text-xl text-base " : "md:text-lg text-xs bg-white/20 md:w-12 md:h-12 w-8 h-8 shadow-[inset_2px_2px_8px_rgba(255,255,255,0.6),_inset_-2px_-2px_8px_rgba(0,0,0,0.1)] backdrop-blur-xl"
                        }`}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    )
}
