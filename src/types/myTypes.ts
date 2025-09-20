export type ProductType = {
	id: string;
	created_at: Date;
	name: string;
	slug: string;
	imagePaths: string[];
};

export type ProjectType = {
	id: number;
	name: string;
	image_path: string[];
	description: string;
	city: string;
	country: string;
};
