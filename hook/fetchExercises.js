export const fetchExercises = async () => {
    try {
      const response = await fetch("https://api.api-ninjas.com/v1/exercises", {
        method: "GET",
        headers: {
          "X-Api-Key": "Y6spMF5iAugrFiD8ZemM1w==eR4tacjcjhfHFEef" // Vaihda omaan API-avaimeesi
        }
      });
      if (!response.ok) {
        throw new Error(`API-kutsun virhe: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Virhe haettaessa harjoituksia:", error.message);
      return [];
    }
   };