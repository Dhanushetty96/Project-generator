export const processCodeWithVariables = (code, variables) => {
    let processedCode = code;
    variables.forEach((variable) => {
        const regex = new RegExp(`{{${variable.name}}}`, "g");
        processedCode = processedCode.replace(regex, variable.value);
    });
    return processedCode;
};
