import { useState, useEffect } from 'react';
import { createMergeSortAnimations } from './sortAlgorithms/mergeSort';
import { createQuickSortAnimations } from './sortAlgorithms/quickSort';
import './sorter.css';

const DEFAULT_BAR_COLOR = 'rgb(246, 246, 170)';
const SECOND_BAR_COLOR = '#0060dd';
const SORTING_SPEED = 1000;


function Sorter() {
    const [sortingArray, setSortingArray] = useState([]);
    const [numberOfBars, setNumberOfBars] = useState(75);
    const [algorithm, setAlgorithm] = useState('');
    const [currentlySorting, setCurrentlySorting] = useState(false);

    // Generate a random array to be sorted.
    // Expand to take in a user-specified number of bars.
    function generateArray() {
        let newArray = [];
        for (let i = 0; i < numberOfBars; i++) {
            newArray.push(randomIntFromInterval(5, 360))
        }
        return newArray;
    }

    // Method for creating random integers between two integers.
    // Source: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    useEffect(() => {
        let tempSortArray = generateArray();
        setSortingArray(tempSortArray);
    }, [numberOfBars]);

    // Event Handlers

    // Generate a new array.
    function handleCreate() {
        const generatedArray = generateArray();
        setSortingArray(generatedArray);
    }

    function handleSort() {
        // Generate a new array.
        handleCreate();

        // Then, sort according to whichever algorithm is selected.
        if (algorithm === 'mergesort') {
            setCurrentlySorting(true);
            handleMergeSort();
        }
        if (algorithm === 'quicksort') {
            setCurrentlySorting(true);
            handleQuickSort();
        }
        if (algorithm === 'bubblesort') {
            setCurrentlySorting(true);
            handleBubbleSort()
        }
    }
    // Update the number of bars based on user input.
    function handleSlider(value) {
        const barNumber = value;
        setNumberOfBars(barNumber);
    }

    // This will be called when the 'Merge Sort' button is clicked.
    function handleMergeSort() {
        // Generate the array of animations.
        const mergeSortAnimations = createMergeSortAnimations(sortingArray);

        // This is for calculating the length of time the buttons will disable.
        const lengthOfAnimations = mergeSortAnimations.length;

        // Note: the animations array contains animations in sets of three, comprised of
        // two comparisons and an overwrite.
        // E.g. [[i, j], [i, j], [k, valueAt[i or j]]] such that i and j are the same two indices per triplet 
        // (the first to change color, the second to revert color) and k represents the index in the main array
        // meant to be replaced by valueAt[i or j].       

        // Iterate over the array of animations, coloring the elements at the first two
        for (let i = 0; i < lengthOfAnimations; i++) {
            // Access a list of all bars using the DOM class selector.
            const arrayOfBarElements = document.getElementsByClassName('bar');

            // Since the first two elements in a triplet, color should not change on the third element,
            // represented here by i modulo 3 having no value (remainder).
            const colorShouldChange = (i % 3 !== 2);

            // We need to change the color of the bar using the DOM.
            if (colorShouldChange) {
                // Grab both indices via destructuring.
                const [leftBarIndex, rightBarIndex] = mergeSortAnimations[i];

                // Grab the CSS style object in order to set the backgroundColor.
                const leftBarStyle = arrayOfBarElements[leftBarIndex].style;
                const rightBarStyle = arrayOfBarElements[rightBarIndex].style;

                // If it's the first comparison, change to blue, otherwise, change back to yellow.
                const barColor = i % 3 === 0 ? SECOND_BAR_COLOR : DEFAULT_BAR_COLOR;

                setTimeout(() => {
                    leftBarStyle.backgroundColor = barColor;
                    rightBarStyle.backgroundColor = barColor;
                }, i * SORTING_SPEED);
            } else {
                // Otherwise we've reached an array of [k, valueAt[i or j]].
                // We need to overwrite a value in the array.
                setTimeout(() => {
                    const [changeBarIndex, changeBarHeight] = mergeSortAnimations[i];
                    const barStyle = arrayOfBarElements[changeBarIndex].style;
                    barStyle.height = `${changeBarHeight}px`
                    barStyle.transform = `rotateY(${changeBarHeight}deg)`;
                }, i * SORTING_SPEED);
            }
        }

        // Once the animation is finished executing, change the state of 
        // currentlySorting to enable to sort button and slider again.
        setTimeout(() => {
            setCurrentlySorting(false);
        }, SORTING_SPEED * lengthOfAnimations);
    }

    function handleQuickSort() {
        // Generate the array of animations.
        const quickSortAnimations = createQuickSortAnimations(sortingArray);
        const lengthOfAnimations = quickSortAnimations.length;

        // Iterate over the list of animations.
        for (let i = 0; i < lengthOfAnimations; i++) {
            // Access a list of all bars using the DOM class selector.
            const arrayOfBarElements = document.getElementsByClassName('bar');

            const [leftBarIndex, rightBarIndex] = quickSortAnimations[i];

            const leftBarStyle = arrayOfBarElements[leftBarIndex].style;
            const rightBarStyle = arrayOfBarElements[rightBarIndex].style;

            const barColor = i % 2 === 0 ? SECOND_BAR_COLOR : DEFAULT_BAR_COLOR;

            setTimeout(() => {
                leftBarStyle.backgroundColor = barColor;
                rightBarStyle.backgroundColor = barColor;
            }, i * SORTING_SPEED);
        }

        // Once the animation is finished executing, change the state of 
        // currentlySorting to enable to sort button and slider again.
        setTimeout(() => {
            setCurrentlySorting(false);
        }, SORTING_SPEED * lengthOfAnimations);

    }

    function handleBubbleSort() {
        console.log('bubblesorting!')
    }

    return (
        <div className="sorter">
            <div className="barContainer">
                {
                    sortingArray.map((value, index) => {
                        return (<div key={index} className="bar" style={{ height: `${value}px`, transform: `rotateY(${value}deg)` }} />)
                    })
                }
            </div>
            <div className="buttonContainer">
                <button onClick={() => handleSort()}
                        type="button"
                        disabled={currentlySorting}>Sort Array</button>
                <input onChange={(e) => handleSlider(e.target.value)}
                       id="barSlider"
                       type="range"
                       disabled={currentlySorting}
                       defaultValue={numberOfBars}
                       min="10"
                       max="100" />
                <div className="sortInputContainer">
                    <form>
                        <input type="radio" 
                               id="mergeSort" 
                               value="mergesort"
                               disabled={currentlySorting}
                               checked={algorithm === 'mergesort'}
                               onChange={(e) => setAlgorithm(e.target.value)}></input>
                        <label htmlFor="mergeSort">Merge Sort</label>
                        <input type="radio" 
                               id="quickSort"
                               value="quicksort"
                               disabled={currentlySorting}
                               checked={algorithm === 'quicksort'} 
                               onChange={(e) => setAlgorithm(e.target.value)}></input>
                        <label htmlFor="quickSort">Quick Sort</label>
                        <input type="radio" 
                               id="bubbleSort" 
                               value="bubblesort"
                               disabled={currentlySorting}
                               checked={algorithm === 'bubblesort'}
                               onChange={(e) => setAlgorithm(e.target.value)}></input>
                        <label htmlFor="bubbleSort">Bubble Sort</label>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Sorter;