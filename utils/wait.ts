export default async function wait() {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve("data");
    }, 1000)
  );
}
