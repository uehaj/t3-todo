import { NavigateToResource } from "@refinedev/nextjs-router";
console.error("hogehogehogg");
console.log("hogehogehogg123");

export default function Home() {
  console.log("xxxxxxxxxx");
  return <NavigateToResource resource={"user"} />;
}
