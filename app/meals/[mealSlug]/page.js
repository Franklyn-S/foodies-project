import Image from "next/image";
import classes from "./page.module.css";
import { getMeal } from "@/lib/meals";
import { Suspense } from "react";
import LoadingPage from "@/components/loading/loading";
import { notFound } from "next/navigation";

async function MealsDetails({ mealSlug }) {
  const meal = await getMeal(mealSlug);
  if (!meal) {
    notFound("No meal found");
  }
  meal.instructions = meal.instructions.replace(/\n/g, "<br />");
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p className={classes.instructions} dangerouslySetInnerHTML={{ __html: meal.instructions }}></p>
      </main>
    </>
  );
}

export default async function MealDetailsPage({ params }) {
  const { mealSlug } = params;

  return (
    <Suspense
      fallback={
        <LoadingPage>
          <h1>Loading meal details...</h1>
        </LoadingPage>
      }
    >
      <MealsDetails mealSlug={mealSlug} />
    </Suspense>
  );
}
