"use client";
import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";

const MAX_LENGTH = 1024;
export default function HomeQRCodePage() {
    const qrRef = useRef<HTMLDivElement | null>(null);
    const [inputValue, setInputValue] = useState<string>("");
    const [value, setValue] = useState<string>("");
    const [loadingPng, setLoadingPng] = useState<boolean>(false);
    const [loadingSvg, setLoadingSvg] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [truncated, setTruncated] = useState<boolean>(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const v = e.target.value;
        if (v.length > MAX_LENGTH) {
            setInputValue(v.slice(0, MAX_LENGTH));
            setTruncated(true);
        } else {
            setInputValue(v);
            setTruncated(false);
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const trimmed = inputValue.trim();
        if (!trimmed) return;
        const safe = trimmed.slice(0, MAX_LENGTH);
        if (trimmed.length > MAX_LENGTH) setTruncated(true);
        setValue(safe);
        setError(null);
    }

    async function downloadPng() {
        if (!qrRef.current || !value) return;
        setError(null);
        setLoadingPng(true);
        try {
            const dataUrl = await toPng(qrRef.current, {
                cacheBust: true,
                backgroundColor: "#ffffff",
            });
            const link = document.createElement("a");
            link.download = `qr-${Date.now()}.png`;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error(err);
            setError("PNG export failed. See console for details.");
        } finally {
            setLoadingPng(false);
        }
    }

    async function downloadSvg() {
        if (!qrRef.current || !value) return;
        setError(null);
        setLoadingSvg(true);
        try {
            const svgEl = qrRef.current.querySelector("svg");
            if (!svgEl) throw new Error("SVG not found");
            const clone = svgEl.cloneNode(true) as SVGSVGElement;
            if (!clone.getAttribute("xmlns")) {
                clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            }
            const width = clone.getAttribute("width") || "256";
            const height = clone.getAttribute("height") || "256";
            const hasRect = Array.from(clone.children).some(
                (c) => c.tagName.toLowerCase() === "rect",
            );
            if (!hasRect) {
                const rect = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "rect",
                );
                rect.setAttribute("width", width);
                rect.setAttribute("height", height);
                rect.setAttribute("fill", "#ffffff");
                clone.insertBefore(rect, clone.firstChild);
            }
            const serializer = new XMLSerializer();
            const svgString = serializer.serializeToString(clone);
            const blob = new Blob([svgString], {
                type: "image/svg+xml;charset=utf-8",
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `qr-${Date.now()}.svg`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
            setError("SVG export failed. See console for details.");
        } finally {
            setLoadingSvg(false);
        }
    }

    function copyValue() {
        if (!value) return;
        navigator.clipboard?.writeText(value).catch(() => {});
    }

    return (
        <main className="min-h-screen flex items-center justify-center p-6 bg-slate-900 text-white">
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-semibold text-center mb-6">
                    QR Code Generator
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="mb-4"
                    aria-describedby={truncated ? "trunc-note" : undefined}
                >
                    <div className="flex gap-2">
                        <label htmlFor="qrvalue" className="sr-only">
                            QR value
                        </label>

                        <input
                            id="qrvalue"
                            name="qrvalue"
                            type="text"
                            value={inputValue}
                            onChange={handleChange}
                            maxLength={MAX_LENGTH}
                            placeholder="Enter text or URL"
                            className="flex-1 p-3 border rounded-md shadow-sm bg-transparent text-white placeholder:text-slate-400"
                            style={{ borderColor: "rgba(255,255,255,0.08)" }}
                            aria-invalid={truncated}
                            aria-describedby={
                                truncated ? "trunc-note" : undefined
                            }
                        />

                        <button
                            type="submit"
                            disabled={!inputValue.trim()}
                            className="px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                            aria-disabled={!inputValue.trim()}
                        >
                            Create
                        </button>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-sm text-slate-400">
                        <span>
                            {inputValue.length}/{MAX_LENGTH}
                        </span>
                        {truncated ? (
                            <span id="trunc-note" className="text-yellow-300">
                                Input truncated to {MAX_LENGTH} chars
                            </span>
                        ) : null}
                    </div>
                </form>

                <section className="flex flex-col items-center gap-4">
                    {value ? (
                        <>
                            <div className=" bg-slate-400/30 p-6 rounded-lg">
                                <div
                                    ref={qrRef}
                                    className="qr-export-bg p-4 rounded-lg shadow"
                                    aria-hidden={false}
                                    style={{ display: "inline-block" }}
                                >
                                    <QRCode
                                        value={value}
                                        size={256}
                                        level="M"
                                        bgColor="#ffffff"
                                        fgColor="#000000"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 items-center mt-2">
                                <button
                                    type="button"
                                    onClick={downloadPng}
                                    disabled={loadingPng}
                                    className="px-4 py-2 bg-emerald-600 rounded-md hover:bg-emerald-700 disabled:opacity-50"
                                >
                                    {loadingPng
                                        ? "Preparing PNG..."
                                        : "Download PNG"}
                                </button>

                                <button
                                    type="button"
                                    onClick={downloadSvg}
                                    disabled={loadingSvg}
                                    className="px-4 py-2 bg-sky-600 rounded-md hover:bg-sky-700 disabled:opacity-50"
                                >
                                    {loadingSvg
                                        ? "Preparing SVG..."
                                        : "Download SVG"}
                                </button>

                                <button
                                    type="button"
                                    onClick={copyValue}
                                    className="px-3 py-2 bg-slate-700 rounded-md hover:bg-slate-600 text-sm"
                                >
                                    Copy
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="text-slate-400">
                            Enter a value above to generate a QR code.
                        </p>
                    )}

                    {error && (
                        <p className="text-sm text-red-600 mt-2">{error}</p>
                    )}
                </section>
            </div>
        </main>
    );
}
