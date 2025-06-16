export const formatDate = (rawDate: Date) => {
    if(!rawDate) return '';
    const dObj = new Date(rawDate);
    const yy = dObj.getFullYear().toString().slice(2);
    const mm = String(dObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dObj.getDate()).padStart(2, '0');
    return `${yy}.${mm}.${dd}`;
}