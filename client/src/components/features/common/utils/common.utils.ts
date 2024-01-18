
export const convertUppercaseStringsWithUnderscoresToReadableString = (inputString: string): string => {
    return inputString
        .toLowerCase()
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
