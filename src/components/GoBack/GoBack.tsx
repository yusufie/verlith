import Image from "next/image";
import Link from "next/link";

interface Props {
	link: string;
	text?: string;
	className?: string;
}

const GoBack = (props: Props) => {
	return (
		<Link
			href={props.link}
			className={`${props.className}`}
			style={{ display: "inline-flex", marginRight: "1rem" }}
		>
			<Image src="/icons/left-arrow.svg" alt="left" width={20} height={20} style={{ marginRight: "1rem" }}/>
			<p>{props.text ? props.text : "Go back"}</p>
		</Link>
	);
};

export default GoBack;