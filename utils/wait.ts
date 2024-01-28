export default async function wait(seconds: number) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve("data");
    }, seconds)
  );
}
