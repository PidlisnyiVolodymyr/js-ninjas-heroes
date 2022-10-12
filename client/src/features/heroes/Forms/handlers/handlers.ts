interface IState {
	state: any;
	stateSetter: (arg: any) => void;
}

export const handleTextInputChange = (target: HTMLInputElement, { state, stateSetter }: IState) => {
	stateSetter({ ...state, [target.name]: target.value });
};

export const handleFileInputChange = ({ state, stateSetter }: IState, images: FileList | null) => {
	stateSetter({ ...state, images });
};

export const handleMultiSelectInputChange = ({ state, stateSetter }: IState, superPowersIds: string[]) => {
	stateSetter({ ...state, superPowersIds });
};
