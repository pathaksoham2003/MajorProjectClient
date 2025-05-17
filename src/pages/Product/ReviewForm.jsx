const ReviewForm = () => {
    return (
      <div className="max-w-[1200px] w-full mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-text">Reviews</h2>
        <form className="flex flex-col gap-4">
          <textarea
            placeholder="Write your review..."
            className="w-full h-28 p-4 rounded-md border border-gray-300 bg-background text-text"
          ></textarea>
          <button type="submit" className="bg-primary text-white py-2 px-4 rounded-md self-end">
            Submit Review
          </button>
        </form>
      </div>
    );
  };
  
  export default ReviewForm;
  