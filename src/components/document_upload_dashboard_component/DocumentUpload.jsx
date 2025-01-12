import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import promptData from "./prompt.json"; // Import JSON file
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "./DocumentUpload.css";

// Set workerSrc to the locally hosted worker file
pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.mjs`;

function DocumentUpload() {
    const [pdfFile, setPdfFile] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [startPage, setStartPage] = useState(1);
    const [endPage, setEndPage] = useState(10);

    // Load system and user prompts from JSON
    const [systemPrompt, setSystemPrompt] = useState(promptData.system_prompt);
    const [userPrompt, setUserPrompt] = useState(promptData.user_prompt);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            setPdfFile(file);
        } else {
            alert("Please upload a valid PDF file.");
        }
    };

    const handleDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Document Upload</h2>

            {/* File Upload */}
            <div style={{ marginBottom: "20px" }}>
                <label>
                    <strong>Upload PDF:</strong>
                    <input type="file" accept="application/pdf" onChange={handleFileChange} />
                </label>
            </div>

            {pdfFile && (
                <div>
                    <h4>PDF Uploaded: {pdfFile.name}</h4>
                    <p>Total Pages: {numPages}</p>

                    <div className="page-container">
                        {/* Start Page  */}
                        <div className="left-page">
                            <label>
                                Start Page:
                                <input
                                    type="number"
                                    value={startPage}
                                    onChange={(e) => setStartPage(Number(e.target.value))}
                                    style={{ marginLeft: "10px", width: "60px" }}
                                />
                            </label>

                            <Document file={pdfFile} onLoadSuccess={handleDocumentLoadSuccess}>
                                <div style={{ marginBottom: "20px" }}>
                                    <h4>Previewing Page {startPage}:</h4>
                                    <Page pageNumber={startPage} renderTextLayer={false} />
                                </div>
                            </Document>
                        </div>

                        {/* End Page */}
                        <div className="right-page">
                            <label>
                                End Page:
                                <input
                                    type="number"
                                    value={endPage}
                                    onChange={(e) => setEndPage(Number(e.target.value))}
                                    style={{ marginLeft: "10px", width: "60px" }}
                                />
                            </label>

                            <Document file={pdfFile} onLoadSuccess={handleDocumentLoadSuccess}>
                                <div style={{ marginBottom: "20px" }}>
                                    <h4>Previewing Page {endPage}:</h4>
                                    <Page pageNumber={endPage} renderTextLayer={false} />
                                </div>
                            </Document>
                        </div>
                    </div>
                </div>
            )}

            {/* System Prompt TextArea */}
            <div style={{ marginBottom: "20px" }}>
                <label>
                    <strong>System Prompt:</strong>
                    <textarea
                        value={systemPrompt}
                        onChange={(e) => setSystemPrompt(e.target.value)}
                        rows="8"
                        style={{ display: "block", width: "100%", marginTop: "10px", padding: "10px" }}
                    />
                </label>
            </div>

            {/* User Prompt TextArea */}
            <div style={{ marginBottom: "20px" }}>
                <label>
                    <strong>User Prompt:</strong>
                    <textarea
                        value={userPrompt}
                        onChange={(e) => setUserPrompt(e.target.value)}
                        rows="4"
                        style={{ display: "block", width: "100%", marginTop: "10px", padding: "10px" }}
                    />
                </label>
            </div>

            {/* Submit Button */}
            <button style={{ padding: "10px 20px", fontSize: "16px" }}>
                Submit
            </button>
        </div>
    );
}

export default DocumentUpload;
