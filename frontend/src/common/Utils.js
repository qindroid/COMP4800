let utils = {
    getDomain() {
        
        if (process.env.NODE_ENV === "development") {
            return "";
        }
        return "https://jllss.azurewebsites.net/";
        
    },
};

export default utils;