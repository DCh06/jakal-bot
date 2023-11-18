//todo move random logic here
export function generateRandomDateInBoundaries(lowerBoundary: Date, upperBoundary: Date) {

    const randomDateSpan = getDateSpanMilis(lowerBoundary,upperBoundary);

    return new Date(lowerBoundary.getTime() + Math.floor(Math.random() * randomDateSpan))

}

export function getDateSpanMilis(lowerBoundary: Date , upperBoundary: Date) {
    return upperBoundary.getTime() - lowerBoundary.getTime();
}