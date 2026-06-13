function StarRating({
  rating = 0,
  numberOfStars = 5,
  starRatedColor = "gold",
  starEmptyColor = "#4a4a4a",
  starDimension = "1.2rem",
  starSpacing = "0.1rem",
  name = "star-rating",
}) {
  const clampedRating = Math.min(Math.max(rating, 0), numberOfStars);

  return (
    <div
      className="inline-flex items-center"
      aria-label={`Rating: ${clampedRating} out of ${numberOfStars} stars`}
      role="img"
    >
      {Array.from({ length: numberOfStars }, (_, i) => {
        const filled = clampedRating >= i + 1;
        const partial = !filled && clampedRating > i;
        const fillPercent = partial
          ? Math.round((clampedRating - i) * 100)
          : filled
            ? 100
            : 0;

        const uniqueId = `${name}-grad-${i}`;

        return (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style={{
              width: starDimension,
              height: starDimension,
              marginRight: i < numberOfStars - 1 ? starSpacing : "0",
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            {partial && (
              <defs>
                <linearGradient id={uniqueId} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset={`${fillPercent}%`} stopColor={starRatedColor} />
                  <stop offset={`${fillPercent}%`} stopColor={starEmptyColor} />
                </linearGradient>
              </defs>
            )}
            <polygon
              points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
              fill={
                partial
                  ? `url(#${uniqueId})`
                  : filled
                    ? starRatedColor
                    : starEmptyColor
              }
            />
          </svg>
        );
      })}
    </div>
  );
}

export default StarRating;
