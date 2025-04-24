"use client";

import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { X } from "lucide-react";

// Sample initial HTML code
const initialCode = `<div class="container mx-auto p-4">
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
    const [newVarName, setNewVarName] = useState("");
    const [newVarType, setNewVarType] = useState("string");
    const [newVarValue, setNewVarValue] = useState("");
    const popupRef = useRef(null);

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
                        onClick={() => alert("save to a database")}
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
                    <div className="flex-1 overflow-auto p-4">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: processCodeWithVariables(),
                            }}
                            className="preview-container"
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
        </div>
    );
};

export default CodeEditorWithPreview;
