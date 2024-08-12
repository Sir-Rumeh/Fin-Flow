import { useRef, ChangeEvent } from "react";

interface TextAreaProps {
	label: string;
	value: string;
	emptyValue: boolean;
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaComponent: React.FC<TextAreaProps> = ({ label, value, onChange, emptyValue }) => {
	const maxCharacterCount = 24;
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const elementRef = useRef(null);

	const style = {
		border: "#d0d7de 1px solid",
		borderOpacity: "0.1",
	};

	const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const newText = event.target.value;
		if (newText.length <= maxCharacterCount) {
			onChange(event);
		}
	};

	const remainingCharacters = maxCharacterCount - value.length;

	return (
		<>
			<textarea
				className="w-full xl:h-[5.5rem] text-sm font-normal font-sans leading-5 p-3 rounded-xl rounded-br-none focus:shadow-outline-purple border border-purplePrimary hover:border-purple-500 focus:border-purple-500 bg-white focus-visible:outline-0"
				ref={textAreaRef}
				onChange={handleInputChange}
				placeholder={label}
				style={style}
				maxLength={24}
			/>

			<div ref={elementRef} className={`flex ${emptyValue ? "justify-between" : "justify-end"}  `}>
				{emptyValue && (
					<p className="text-xs italic text-redPrimary ">
						Comment is required to approve or decline portfolio
					</p>
				)}
				<p> {`${remainingCharacters} characters left `}</p>
			</div>
		</>
	);
};

export default TextAreaComponent;
