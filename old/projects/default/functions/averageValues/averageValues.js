function averageValues(numbers) {
    if (!Array.isArray(numbers) || !numbers.every(Number.isFinite)) return NaN;
    const total = numbers.reduce((acc, val) => acc + val, 0);
    return total / numbers.length;
}