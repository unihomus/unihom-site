"use client";
import { ProductType } from "@/types/myTypes";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import ImageCard from "./ImageCard";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ImageCarousel({ data }: { data: ProductType[] }) {
	const [randomNumArray, setRandomNumArray] = useState([] as number[]);

	// Math.random needs to be in useEffect to prevent hydration mismath
	// state is not being updated right away (?)
	const pickedFurnitures = (arrayOfFurnitures: ProductType[]) => {
		let counter = 0;
		let tempArray = [] as number[];
		while (counter < arrayOfFurnitures.length / 2) {
			const index = Math.floor(Math.random() * arrayOfFurnitures.length);
			if (!tempArray.includes(index)) {
				tempArray.push(index);
				counter++;
			}
		}
		setRandomNumArray(tempArray);
	};

	useEffect(() => {
		pickedFurnitures(data);
	}, []);

	return (
		<div className="flex flex-col justify-center items-center w-full h-full p-4">
			<div className="hidden lg:flex flex-col justify-center items-center w-full h-full">
				<Swiper
					navigation={true}
					pagination={true}
					modules={[Navigation, Pagination]}
					spaceBetween={50}
					slidesPerView={3}
					loop={true}
				>
					{randomNumArray?.map((indexNum, index) => (
						<SwiperSlide
							key={index}
							className="flex flex-col items-center justify-center"
						>
							<Link
								href={`/products/${data[indexNum].slug}`}
								tabIndex={-1}
							>
								<ImageCard
									imageSource={{
										src: data[indexNum].imageUrl[0],
										name: data[indexNum].name,
									}}
								/>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			<div className="hidden md:flex lg:hidden flex-col justify-center items-center w-full h-full">
				<Swiper
					navigation={true}
					pagination={true}
					modules={[Navigation, Pagination]}
					spaceBetween={50}
					slidesPerView={2}
					loop={true}
				>
					{randomNumArray?.map((indexNum, index) => (
						<SwiperSlide
							key={index}
							className="flex flex-col items-center justify-center"
						>
							<Link
								href={`/products/${data[indexNum].slug}`}
								tabIndex={-1}
							>
								<ImageCard
									imageSource={{
										src: data[indexNum].imageUrl[0],
										name: data[indexNum].name,
									}}
								/>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			<div className="md:hidden flex flex-col justify-center items-center w-full h-full">
				<Swiper
					navigation={true}
					pagination={true}
					modules={[Navigation, Pagination]}
					spaceBetween={30}
					slidesPerView={1}
					loop={true}
				>
					{randomNumArray?.map((indexNum, index) => (
						<SwiperSlide
							key={index}
							className="flex flex-col items-center justify-center"
						>
							<Link
								href={`/products/${data[indexNum].slug}`}
								tabIndex={-1}
							>
								<ImageCard
									imageSource={{
										src: data[indexNum].imageUrl[0],
										name: data[indexNum].name,
									}}
								/>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}
