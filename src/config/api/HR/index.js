import axios from "axios";
import authHeader from "../Auth/header";

export const getHRDashboard = () => Get('hr', 'dashboard', {headers: authHeader()});