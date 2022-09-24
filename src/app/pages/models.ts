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
