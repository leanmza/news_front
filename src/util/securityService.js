export const getToken = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      return token !== null ? token : null;
    }
  };
  
  export const cleanToken = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
    }
  };
  