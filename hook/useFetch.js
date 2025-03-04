import { useState, useEffect } from "react";


const useFetch = () => {
 const [data, setData] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState(null);
 const [bestExercises, setBestExercises] = useState([]);

 const exerciseData = [
   {
     id: 1,
     title: "Push-Ups",
     shortDescription: "A classic upper-body workout to strengthen the chest, shoulders, and triceps.",
     description: "Push-ups are a fundamental bodyweight exercise that enhances upper body and core strength. They work multiple muscle groups, including the chest, shoulders, triceps, and core. Variations like wide-arm, diamond, and decline push-ups can add intensity and target different areas. Regular push-up workouts improve muscular endurance, posture, and overall strength.",
     duration: "10 minutes",
     image: "https://images.unsplash.com/photo-1599058917212-d9066d0edcb4?q=80&w=2070&auto=format&fit=crop",
     target: "upper body strength",
     instructions: [
       "Start in a plank position with hands shoulder-width apart.",
       "Lower your body until your chest nearly touches the floor.",
       "Keep your elbows at a 45-degree angle.",
       "Push back up to the starting position.",
       "Repeat for the desired number of reps."
     ]
   },
   {
     id: 2,
     title: "Squats",
     shortDescription: "A powerful lower-body exercise that strengthens the legs and glutes.",
     description: "Squats are one of the best compound exercises for building lower body strength. They engage the quadriceps, hamstrings, glutes, and core. Proper form is crucial to avoid injury and maximize benefits. Squats can be performed with bodyweight, dumbbells, or barbells to increase intensity.",
     duration: "12 minutes",
     image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50e?q=80&w=1878&auto=format&fit=crop",
     target: "lower body strength",
     instructions: [
       "Stand with feet shoulder-width apart.",
       "Lower your body by bending your knees and pushing your hips back.",
       "Keep your chest up and your knees in line with your toes.",
       "Go down until your thighs are parallel to the floor.",
       "Push through your heels to return to the starting position."
     ]
   },
   {
     id: 3,
     title: "Plank",
     shortDescription: "A core-strengthening exercise that enhances stability and endurance.",
     description: "The plank is a static exercise that engages the core, shoulders, and lower back. It helps improve posture, stability, and endurance. Different variations, such as side planks and forearm planks, can target additional muscle groups.",
     duration: "1-3 minutes",
     image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=2070&auto=format&fit=crop",
     target: "core strength",
     instructions: [
       "Start in a push-up position with your forearms on the ground.",
       "Keep your body in a straight line from head to heels.",
       "Engage your core and hold the position.",
       "Avoid sagging your hips or raising them too high.",
       "Hold for as long as possible while maintaining good form."
     ]
   },
   {
     id: 4,
     title: "Lunges",
     shortDescription: "A dynamic lower-body movement that enhances balance and leg strength.",
     description: "Lunges are excellent for strengthening the legs and improving balance. They work the quadriceps, hamstrings, glutes, and core. Variations like forward, reverse, and lateral lunges help target different muscle groups.",
     duration: "10 minutes",
     image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=2070&auto=format&fit=crop",
     target: "leg strength",
     instructions: [
       "Stand upright with feet hip-width apart.",
       "Step forward with one leg and lower your hips until both knees are at 90-degree angles.",
       "Keep your front knee aligned with your ankle.",
       "Push through your front foot to return to the starting position.",
       "Repeat with the other leg."
     ]
   },
   {
     id: 5,
     title: "Jump Rope",
     shortDescription: "A high-intensity cardio workout that improves endurance and coordination.",
     description: "Jump rope exercises are an excellent way to build cardiovascular endurance, agility, and coordination. They engage the legs, shoulders, and core. Jumping rope is a time-efficient way to burn calories and improve overall fitness.",
     duration: "5-15 minutes",
     image: "https://images.unsplash.com/photo-1603892581557-bcfc77fe9f50?q=80&w=2070&auto=format&fit=crop",
     target: "cardio endurance",
     instructions: [
       "Hold the rope handles firmly and keep your elbows close to your sides.",
       "Swing the rope over your head and jump as it reaches your feet.",
       "Land softly on the balls of your feet.",
       "Maintain a steady rhythm and control your breathing.",
       "Increase speed or add variations like double-unders for intensity."
     ]
   }
 ];
 const BestExercises = [
   {
     id: 6,
     title: "Burpees",
     description: "A full-body exercise that combines strength and cardio for maximum intensity.",
     duration: "8 minutes",
     image: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?q=80&w=2070&auto=format&fit=crop",
     target: "full-body conditioning",
     instructions: [
       "Start in a standing position.",
       "Drop into a squat and place your hands on the ground.",
       "Kick your feet back into a push-up position.",
       "Perform a push-up, then jump your feet forward.",
       "Explode into a jump and repeat the movement."
     ]
   },
   {
     id: 7,
     title: "Deadlifts",
     description: "A powerful strength-building exercise targeting the posterior chain muscles.",
     duration: "15 minutes",
     image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=2070&auto=format&fit=crop",
     target: "posterior chain strength",
     instructions: [
       "Stand with feet hip-width apart, barbell in front of you.",
       "Hinge at the hips and grip the bar just outside your knees.",
       "Keep your back straight and engage your core.",
       "Lift the bar by extending your hips and standing upright.",
       "Lower the bar slowly back to the ground with control."
     ]
   },
   {
     id: 8,
     title: "Pull-Ups",
     description: "An upper-body exercise that strengthens the back, biceps, and shoulders.",
     duration: "10 minutes",
     image: "https://images.unsplash.com/photo-1599058917212-d9066d0edcb4?q=80&w=2070&auto=format&fit=crop",
     target: "upper body strength",
     instructions: [
       "Grip the pull-up bar with palms facing away (shoulder-width apart).",
       "Engage your core and pull yourself up until your chin clears the bar.",
       "Lower yourself slowly back to the starting position.",
       "Avoid swinging or using momentum.",
       "Perform as many controlled reps as possible."
     ]
   }
 ];

 useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  const getItemById = (id) => {
    const item =
      exerciseData.find((exercise) => exercise.id === id) ||
      BestExercises.find((exercise) => exercise.id === id);
    return item || null;
  };

  return { data, isLoading, error, refetch, getItemById, bestExercises };
};