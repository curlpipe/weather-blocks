import { getWeatherDescription, getWeatherIcon } from "./weatherUtils.js";

it("Description should be correct based on weather code", () => {
    // arrange
    const weatherCodes = [3, 7, 1, 67, 40, 23];
    const expectedValues = [
        "Overcast",
        "Unknown weather condition",
        "Mainly clear",
        "Freezing Rain: Heavy intensity",
        "Unknown weather condition",
        "Unknown weather condition",
    ];
    // act
    const actualValues = weatherCodes.map(getWeatherDescription);
    // assert
    expect(actualValues).toEqual(expectedValues);
});

it("Icon should be correct based on weather code", () => {
    // arrange
    const weatherCodes = [5, 63, 38, 0, 99];
    const expectedValues = ["❓", "🌧️", "❓", "☀️", "⛈️"];
    // act
    const actualValues = weatherCodes.map(getWeatherIcon);
    // assert
    expect(actualValues).toEqual(expectedValues);
});
