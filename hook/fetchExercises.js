export const fetchExercises = async () => {
    try {
      const response = await fetch("https://exercisedb.p.rapidapi.com/exercises", {
        method: "GET",
        headers: {
          "x-rapidapi-key": "cf220b46c2mshc4221636473607dp189b68jsnccb0f9eb282a",
          "x-rapidapi-host": "exercisedb.p.rapidapi.com"
        }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Virhe API-kutsussa: ${errorData.message || response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Virhe haettaessa harjoituksia:", error.message);
      return [];
    }
   };