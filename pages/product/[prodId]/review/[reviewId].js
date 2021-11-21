import { useRouter } from "next/router";
const ReviewId = () => {
  const route = useRouter();
  console.log("🚀 ~ file: [reviewId].js ~ line 4 ~ ReviewId ~ router", route);

  return (
    <div>
      product id: {route.query.prodId} review id: {route.query.reviewId}
    </div>
  );
};

export default ReviewId;
