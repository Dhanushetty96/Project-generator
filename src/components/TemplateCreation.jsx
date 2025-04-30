"use client";

import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { X } from "lucide-react";

// Sample initial HTML code
const initialCode = `<div class="container text-black mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Welcome to Live Editor</h1>
  <p class="mb-4">This is a live preview of your HTML code.</p>
  <p class="mb-4">Try using variables like: {{variableName}}</p>
  <div class="bg-blue-100 p-4 rounded">
    <p>You can add variables and see them update in real-time!</p>
  </div>
</div>`;

const CodeEditorWithPreview = () => {
    const [code, setCode] = useState(initialCode);
    const [variables, setVariables] = useState([]);
    const [isAddingVariable, setIsAddingVariable] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [templateName, setTemplateName] = useState("");
    const [templateType, setTemplateType] = useState("Other");
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [newVarName, setNewVarName] = useState("");
    const [newVarType, setNewVarType] = useState("string");
    const [newVarValue, setNewVarValue] = useState("");
    const popupRef = useRef(null);

    const templateTypes = [
        "Portfolio",
        "Blog",
        "E-commerce",
        "Business",
        "Creative",
        "Other",
    ];

    // Handle click outside popup to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsAddingVariable(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Function to replace variables in the code
    const processCodeWithVariables = () => {
        let processedCode = code;
        variables.forEach((variable) => {
            const regex = new RegExp(`{{${variable.name}}}`, "g");
            processedCode = processedCode.replace(regex, variable.value);
        });
        return processedCode;
    };

    // Add a new variable
    const addVariable = () => {
        if (newVarName.trim() === "") return;

        setVariables([
            ...variables,
            { name: newVarName, type: newVarType, value: newVarValue },
        ]);

        setNewVarName("");
        setNewVarType("string");
        setNewVarValue("");
        setIsAddingVariable(false);
    };

    // Delete a variable
    const deleteVariable = (index) => {
        const newVariables = [...variables];
        newVariables.splice(index, 1);
        setVariables(newVariables);
    };

    // Update variable value
    const updateVariableValue = (index, value) => {
        const newVariables = [...variables];
        newVariables[index].value = value;
        setVariables(newVariables);
    };

    // Variable input based on type
    const renderVariableInput = (variable, index) => {
        switch (variable.type) {
            case "number":
                return (
                    <input
                        type="number"
                        value={variable.value}
                        onChange={(e) =>
                            updateVariableValue(index, e.target.value)
                        }
                        className="border rounded p-1 w-full"
                    />
                );
            case "link":
                return (
                    <input
                        type="url"
                        value={variable.value}
                        onChange={(e) =>
                            updateVariableValue(index, e.target.value)
                        }
                        className="border rounded p-1 w-full"
                        placeholder="https://example.com"
                    />
                );
            default:
                return (
                    <input
                        type="text"
                        value={variable.value}
                        onChange={(e) =>
                            updateVariableValue(index, e.target.value)
                        }
                        className="border rounded p-1 w-full"
                    />
                );
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
        setSuccessMessage("");
        setErrorMessage("");
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async () => {
        if (!templateName.trim()) {
            setErrorMessage("Please enter a template name");
            return;
        }

        setIsLoading(true);
        try {
            // Send the template data to the server
            const response = await fetch("/api/templates", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    templateName,
                    templateType,
                    code,
                    variables,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to save template");
            }

            const data = await response.json();
            setSuccessMessage("Template saved successfully!");
            setTimeout(() => {
                closeModal();
            }, 500);
        } catch (error) {
            setErrorMessage(error.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="bg-gray-100 p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold text-black">
                    Live Template Creator
                </h2>
                <div className="flex gap-4">
                    <button
                        onClick={() => setIsAddingVariable(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add Variable
                    </button>
                    <button
                        onClick={openModal}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Publish Template
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Code Editor */}
                <div className="w-1/2 border-r">
                    <Editor
                        height="100%"
                        defaultLanguage="html"
                        value={code}
                        onChange={setCode}
                        options={{
                            minimap: { enabled: false },
                            automaticLayout: true,
                            formatOnPaste: true,
                            formatOnType: true,
                            scrollBeyondLastLine: false,
                        }}
                    />
                </div>

                {/* Live Preview */}
                <div className="w-1/2 flex flex-col">
                    <div className="flex-1 overflow-auto p-0 bg-white text-black">
                        {/* <div
                            dangerouslySetInnerHTML={{
                                __html: processCodeWithVariables(),
                            }}
                            className="preview-container"
                        /> */}
                        <iframe
                            srcDoc={`
                                <html>
                                    <head>
                                        <script src="https://cdn.tailwindcss.com"></script>
                                    </head>
                                    <body class="">
                                        ${processCodeWithVariables()}
                                    </body>
                                </html>
                            `}
                            className="h-full w-full"
                        />
                    </div>

                    {/* Variables Panel */}
                    <div className="border-t p-4 max-h-64 overflow-y-auto">
                        <h3 className="font-bold mb-2">Variables</h3>
                        {variables.length === 0 ? (
                            <p className="text-gray-500">
                                No variables defined yet
                            </p>
                        ) : (
                            <div className="space-y-2 text-gray-700">
                                {variables.map((variable, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-2 p-2 bg-gray-50 rounded"
                                    >
                                        <div className="flex-1 space-y-1">
                                            <div className="flex justify-between">
                                                <div className="font-medium">{`{{${variable.name}}}:`}</div>
                                                <span className="text-xs bg-gray-200 px-1 rounded flex items-center">
                                                    {variable.type}
                                                </span>
                                            </div>
                                            {renderVariableInput(
                                                variable,
                                                index
                                            )}
                                        </div>
                                        <button
                                            onClick={() =>
                                                deleteVariable(index)
                                            }
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Variable Add Popup */}
            {isAddingVariable && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div
                        ref={popupRef}
                        className="bg-white rounded-lg p-6 w-96 shadow-lg text-black"
                    >
                        <h3 className="text-lg font-bold mb-4">Add Variable</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Variable Name
                                </label>
                                <input
                                    type="text"
                                    value={newVarName}
                                    onChange={(e) =>
                                        setNewVarName(e.target.value)
                                    }
                                    className="border rounded p-2 w-full"
                                    placeholder="variableName"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Variable Type
                                </label>
                                <select
                                    value={newVarType}
                                    onChange={(e) =>
                                        setNewVarType(e.target.value)
                                    }
                                    className="border rounded p-2 w-full"
                                >
                                    <option value="string">String</option>
                                    <option value="number">Number</option>
                                    <option value="link">Link</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Default Value
                                </label>
                                <input
                                    type={
                                        newVarType === "number"
                                            ? "number"
                                            : "text"
                                    }
                                    value={newVarValue}
                                    onChange={(e) =>
                                        setNewVarValue(e.target.value)
                                    }
                                    className="border rounded p-2 w-full"
                                    placeholder={
                                        newVarType === "link"
                                            ? "https://example.com"
                                            : "Default value"
                                    }
                                />
                            </div>
                            <div className="flex justify-end space-x-2 pt-2">
                                <button
                                    onClick={() => setIsAddingVariable(false)}
                                    className="px-4 py-2 border rounded hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={addVariable}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    {/* Modal Content */}
                    <div className="bg-white text-black rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
                        {/* Modal Header */}
                        <div className="bg-gray-100 px-6 py-4 border-b">
                            <h3 className="text-lg font-medium text-gray-900">
                                Publish Template
                            </h3>
                        </div>

                        {/* Modal Body */}
                        <div className="px-6 py-4">
                            {successMessage && (
                                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                                    {successMessage}
                                </div>
                            )}

                            {errorMessage && (
                                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                                    {errorMessage}
                                </div>
                            )}

                            <div className="mb-4">
                                <label
                                    htmlFor="templateName"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Template Name
                                </label>
                                <input
                                    type="text"
                                    id="templateName"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={templateName}
                                    onChange={(e) =>
                                        setTemplateName(e.target.value)
                                    }
                                    placeholder="Enter template name"
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="templateType"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Template Type
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {templateTypes.map((type) => (
                                        <div
                                            key={type}
                                            onClick={() =>
                                                setTemplateType(type)
                                            }
                                            className={`
                                                cursor-pointer rounded-md px-3 py-1.5 text-xs
                                                transition-all duration-200 border
                                                ${
                                                    templateType === type
                                                        ? "bg-indigo-50 border-indigo-400 text-indigo-700 shadow-sm"
                                                        : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                                                }
                                            `}
                                        >
                                            {type}
                                        </div>
                                    ))}
                                </div>

                                <input
                                    type="hidden"
                                    name="templateType"
                                    value={templateType}
                                />
                            </div>

                            <div className="mb-4">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">
                                    Variables
                                </h4>
                                {variables.length === 0 ? (
                                    <p className="text-gray-500 italic text-sm">
                                        No variables added yet
                                    </p>
                                ) : (
                                    <div className="bg-gray-50 rounded-md p-2 max-h-40 overflow-y-auto">
                                        {variables.map((variable, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between py-1 px-2 border-b border-gray-200 last:border-0"
                                            >
                                                <div>
                                                    <span className="font-medium text-sm">
                                                        {variable.name}
                                                    </span>
                                                    <span className="text-xs text-gray-500 ml-2">
                                                        ({variable.type})
                                                    </span>
                                                </div>
                                                <div className="text-sm text-gray-600 truncate max-w-xs">
                                                    {String(variable.value)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-2">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none disabled:bg-blue-400"
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Saving...
                                    </span>
                                ) : (
                                    "Confirm & Save"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CodeEditorWithPreview;
