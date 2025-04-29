export const generateVerificationToken = () =>
    Math.floor(100000 + Math.random() * 9000000).toString();
