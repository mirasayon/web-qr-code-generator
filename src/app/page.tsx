"use client";
import Image from "next/image";
import QRCode from "react-qr-code";
import * as htmlToImage from "html-to-image";
import { useRef } from "react";
import type React from "react";
import { toPng } from "html-to-image";
import { useSearchParams } from "next/navigation";
export default function Home() {
	const qrRef = useRef<HTMLDivElement>(null);
	const query = useSearchParams().get("qrvalue");
	const handleDownload = async () => {
		if (!qrRef.current) return;
		try {
			const dataUrl = await toPng(qrRef.current);
			const link = document.createElement("a");
			link.download = "qr-code.png";
			link.href = dataUrl;
			link.click();
		} catch (err) {
			console.error("Error generating image", err);
		}
	};
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<div>
				<form
					onSubmit={(asd) => {
						console.log(asd);
					}}
					className=" p-2 border-amber-100 border-2"
				>
					<input type="text" name="qrvalue" id="qrvalue" className="text-4xl outline-none" />
					<input type="submit" value="Create" className=" bg-green-200 text-black" />
				</form>
			</div>
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<div className=" bg-black p-2 m-2 border-16 border-red-950">
					{query ? (
						<div>
							<div ref={qrRef}>
								<QRCode value={query} size={256} />
							</div>
							<button type="button" className=" cursor-pointer p-4" onClick={handleDownload}>
								Download QR Code as PNG
							</button>
						</div>
					) : (
						<div>None</div>
					)}
				</div>
			</main>
		</div>
	);
}
