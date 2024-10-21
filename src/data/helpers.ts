type GenerateId = () => string;

export const generateId: GenerateId = () => (
    Math.random().toString(16).substring(2) + new Date().getTime().toString(36)
)