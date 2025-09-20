"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
	const router = useRouter();

	return (
		<button
			onClick={() => router.back()}
			className="border-white border-2 w-fit p-2 rounded-md transition-all duration-200 cursor-pointer
                  hover:bg-white hover:text-black
                    focus-within:bg-white focus-within:text-black"
		>
			Back
		</button>
	);
}
