/** @format */

type Chance = `${number}/${number}`;
export const randomChance = (chance: Chance) => {
    // Split the chance string into two parts: dividend (numerator) and divisor (denominator)
    const [dividend, divisor] = chance.split('/').map((v) => parseInt(v));

    if (divisor === 0) {
        throw new Error('Divisor cannot be zero');
    }

    // Generate a random number between 0 and divisor - 1
    const randomNumber = Math.floor(Math.random() * divisor);

    // Return true if the random number is less than dividend, indicating success
    return randomNumber < dividend;
};
