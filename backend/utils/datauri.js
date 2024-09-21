import DataUriParser from 'datauri/parser.js'; // Ensure you're importing from 'datauri/parser'
import path from 'path';

const getDataUri = (file) => {
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);  // Ensure file.buffer is passed here
};

export default getDataUri;