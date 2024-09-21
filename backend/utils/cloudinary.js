import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv"
dotenv.config();

cloudinary.config({ 
    cloud_name: 'dldocewoh', 
    api_key: '361963433594717', 
    api_secret: 't_1p_5FzxgvDW6Alol5hu9nt5I4' // Click 'View API Keys' above to copy your API secret
});
export default cloudinary;