import crypto from 'crypto';

export const formatDate = (rawDate: Date) => {
    if(!rawDate) return '';
    const dObj = new Date(rawDate);
    const yy = dObj.getFullYear().toString().slice(2);
    const mm = String(dObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dObj.getDate()).padStart(2, '0');
    return `${yy}.${mm}.${dd}`;
}

export const generateSalteHash = (password: string) => {
    const pwSalt = process.env.Pw_SALT;
    if(pwSalt === undefined) {
        throw Error("Env Error");
    } 
    const hashedPassword = crypto.createHmac('sha3-512', pwSalt).update(password).digest('hex');
    return hashedPassword;
}