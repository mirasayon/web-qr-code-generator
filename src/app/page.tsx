"use client";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
import { Suspense, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Home() {
	function QRGenerator() {
		const qrRef = useRef<HTMLDivElement>(null);
		const router = useRouter();
		const searchParams = useSearchParams();
		const initialValue = searchParams.get("qrvalue") || "";
		const [value, setValue] = useState(initialValue);

		const handleSubmit = (e: React.FormEvent) => {
			e.preventDefault();
			router.replace(`/?qrvalue=${encodeURIComponent(value)}`);
		};

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
			<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
				<Card className="w-full max-w-md mb-8">
					<CardContent className="space-y-4">
						<h1 className="text-2xl font-semibold text-center">QR Code Generator</h1>
						<form onSubmit={handleSubmit} className="flex gap-2">
							<div className="flex-1">
								<Label htmlFor="qrvalue" className="sr-only">
									QR Value
								</Label>
								<Input
									id="qrvalue"
									name="qrvalue"
									placeholder="Enter text or URL"
									value={value}
									onChange={(e) => setValue(e.target.value)}
									className="text-lg"
									required
								/>
							</div>
							<Button type="submit">Create</Button>
						</form>
					</CardContent>
				</Card>

				<Card className="w-full max-w-md">
					<CardContent className="flex flex-col items-center gap-6">
						{initialValue ? (
							<>
								<div ref={qrRef} className="bg-white p-4 rounded-lg shadow">
									<QRCode value={initialValue} size={256} />
								</div>
								<Button onClick={handleDownload}>Download as PNG</Button>
							</>
						) : (
							<p className="text-gray-500">Enter a value above to generate a QR code.</p>
						)}
					</CardContent>
				</Card>
			</div>
		);
	}
	return (
		<Suspense>
			<QRGenerator />
		</Suspense>
	);
}
