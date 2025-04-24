"use client";

import React, { useEffect } from "react";
import CodeEditorWithPreview from "@/components/TemplateCreation";

const CreateTemplatePage = () => {
    const fetchTemplates = async () => {
        const res = await fetch("/api/templates");
        const data = await res.json();
        console.log(data);
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    return <CodeEditorWithPreview />;
};

export default CreateTemplatePage;
