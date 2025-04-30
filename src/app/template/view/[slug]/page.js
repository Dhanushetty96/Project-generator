"use client";

import { processCodeWithVariables } from "@/lib/helpers";
import React, { useEffect, useState } from "react";

const Page = ({ params }) => {
    // Use React.use to unwrap the params Promise
    const resolvedParams = React.use(params);
    const { slug } = resolvedParams;

    const [templateData, setTemplateData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isActionBarOpen, setIsActionBarOpen] = useState(true);
    const [customVariables, setCustomVariables] = useState({});
    const [previewCode, setPreviewCode] = useState("");

    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                const res = await fetch(`/api/templates?id=${slug}`);
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await res.json();
                setTemplateData(data);
                // Initialize customVariables with the template's variables
                const initialVars = {};
                data.variables.forEach((variable) => {
                    initialVars[variable.name] = variable.value;
                });
                setCustomVariables(initialVars);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTemplate();
    }, [slug]);

    useEffect(() => {
        if (templateData) {
            // Create a deep copy of the template's variables and update with custom values
            const updatedVariables = templateData.variables.map((variable) => ({
                ...variable,
                value:
                    customVariables[variable.name] !== undefined
                        ? customVariables[variable.name]
                        : variable.value,
            }));

            // Process the code with updated variables
            const processedCode = processCodeWithVariables(
                templateData.code,
                updatedVariables
            );

            setPreviewCode(processedCode);
        }
    }, [templateData, customVariables]);

    const handleVariableChange = (name, value) => {
        setCustomVariables((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const downloadTemplate = () => {
        // Create the full HTML content
        const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <title>${templateData.templateName || "Template"}</title>
</head>
<body>
${previewCode}
</body>
</html>`;

        // Create a blob with the HTML content
        const blob = new Blob([fullHtml], { type: "text/html" });
        const url = URL.createObjectURL(blob);

        // Create a temporary anchor element to trigger the download
        const a = document.createElement("a");
        a.href = url;
        a.download = "index.html";
        document.body.appendChild(a);
        a.click();

        // Clean up
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // Render input based on variable type
    const renderVariableInput = (variable) => {
        const { name, type, value } = variable;

        switch (type) {
            case "string":
                return (
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={customVariables[name] || ""}
                        onChange={(e) =>
                            handleVariableChange(name, e.target.value)
                        }
                    />
                );
            case "number":
                return (
                    <input
                        type="number"
                        className="w-full p-2 border rounded"
                        value={customVariables[name] || 0}
                        onChange={(e) =>
                            handleVariableChange(
                                name,
                                parseFloat(e.target.value)
                            )
                        }
                    />
                );
            case "boolean":
                return (
                    <input
                        type="checkbox"
                        className="w-5 h-5"
                        checked={customVariables[name] || false}
                        onChange={(e) =>
                            handleVariableChange(name, e.target.checked)
                        }
                    />
                );
            case "color":
                return (
                    <input
                        type="color"
                        className="w-full p-1 border rounded h-10"
                        value={customVariables[name] || "#000000"}
                        onChange={(e) =>
                            handleVariableChange(name, e.target.value)
                        }
                    />
                );
            default:
                return (
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={customVariables[name] || ""}
                        onChange={(e) =>
                            handleVariableChange(name, e.target.value)
                        }
                    />
                );
        }
    };

    return (
        <div className="flex h-screen w-screen overflow-hidden text-black">
            {/* Action Bar */}
            <div
                className={`flex flex-col bg-gray-100 border-r border-gray-300 transition-all duration-300 ${
                    isActionBarOpen ? "w-64" : "w-12"
                }`}
            >
                {/* Toggle Button */}
                <button
                    className="p-2 bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                    onClick={() => setIsActionBarOpen(!isActionBarOpen)}
                >
                    {isActionBarOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 5l7 7-7 7M5 5l7 7-7 7"
                            />
                        </svg>
                    )}
                </button>

                {/* Action Bar Content - Only visible when expanded */}
                {isActionBarOpen && (
                    <div className="flex-1 overflow-y-auto p-4">
                        <h2 className="text-lg font-bold mb-4">Variables</h2>

                        {templateData.variables.map((variable, index) => (
                            <div key={index} className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    {variable.name}
                                </label>
                                {renderVariableInput(variable)}
                            </div>
                        ))}

                        <button
                            className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                            onClick={downloadTemplate}
                        >
                            Download HTML
                        </button>
                    </div>
                )}
            </div>

            {/* Template Preview */}
            <div className="flex-1 h-full bg-white">
                <iframe
                    srcDoc={`
                        <html>
                        <head>
                            <script src="https://cdn.tailwindcss.com"></script>
                        </head>
                        <body>
                            ${previewCode}
                        </body>
                        </html>
                    `}
                    className="h-full w-full"
                />
            </div>
        </div>
    );
};

export default Page;
