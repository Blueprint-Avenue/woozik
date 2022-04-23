function Poster({ track }) {
	return (
		<div className="w-[260px] h-[360px] rounded-[50px] overflow-hidden relative text-[#ECDBBA]/80 border-[#161616] border-2 cursor-pointer hover:scale-105 hover:text-[#ECDBBA]/100 transition duration-200 ease-out group mx-auto">
			<img
				src={track.albumUrl}
				alt=""
				className="h-full w-full absolute inset-0 object-cover rounded-[50px] opacity-80 group-hover:opacity-100"
			/>
		</div>
	);
}

export default Poster;
