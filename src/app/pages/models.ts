export type LayoutType = 'Grid' | 'List';
export type CreationStatus = 'Default' | 'Published' | 'Archived';

export interface ArtModel {
	name: string;
	title: string;
	category: 'Stable' | 'Coherent' | 'Artistic';
	type: 'text_to_image'
}

export interface Prediction {
	id: string,
    version: string,
    urls: any;
    created_at: string;
    completed_at: string,
    status: "starting" | 'processing' | 'succeeded' | 'failed';
    input: {
		text: string,
		grid_size: 1
    },
    output: string[];
    error: string;
}

export interface Creation {
	creationId: number;
	prompt: string;
	modelType: string;
	outputImage: string;
	isPublished: boolean;
	status: 'Default' | 'Published' | 'Archived';
	description: string;
	likes: number;
	createdAt: string;
}

export interface UserProfile {
	info?: {
		sub: string;
		email: string;
		name: string;
		picture: string;
	}
}

export interface HeaderAction {
	type: 'LayoutChange' | 'StatusChange' | 'Refresh';
	value: any;
}