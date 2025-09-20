import { ImageSourceType } from "@/types/myTypes";
import Image from "next/image";
import { nameToAlt } from "@/utils/nameToAlt";

export default function ImageCard({
	imageSource,
}: {
	imageSource: ImageSourceType;
	width?: number;
	height?: number;
}) {
	return (
		<div className="flex flex-col justify-center items-center relative flex-auto h-160 w-full rounded-md group">
			<Image
				src={imageSource.src}
				alt={nameToAlt(imageSource.name)}
				fill
				className="rounded-md object-cover"
			/>
			<div
				className="absolute right-0 bottom-0 h-0 bg-white/80 w-full transition-all duration-200 rounded-b-md
												group-hover:h-14 group-hover:p-2"
			>
				<p className="text-black text-center font-semibold">
					{imageSource.name}
				</p>
			</div>
		</div>
	);
}
