import { useRouter } from "next/router";

const Docs = () => {
  const route = useRouter();
  console.log("🚀 ~ file: [...params].js ~ line 5 ~ Docs ~ route", route);
  return (
    <div>
      docs
      {route.query.params instanceof Array &&
        route.query.params.map((item) => <p>{item}</p>)}
    </div>
  );
};

export default Docs;
