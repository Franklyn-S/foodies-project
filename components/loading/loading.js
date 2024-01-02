import classes from "./loading.module.css";

export default function LoadingPage({ children = <h1>Fetching data...</h1> }) {
  return <div className={classes.loading}>{children}</div>;
}
