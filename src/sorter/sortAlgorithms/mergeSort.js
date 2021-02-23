// THE MERGESORT COMMMENTED AT THE END OF THE FILE (MY FIRST ATTEMPT) WORKS PURELY FOR SORTING, 
// HOWEVER HERE I'VE REFACTORED IT IN ORDER TO DISPLAY THE COMPARISONS FOR THE PURPOSE OF VISUALIZING THE ALGORITHM.
// TUTORIAL COURTESY CLEMENT MIHAILESCU: https://www.youtube.com/watch?v=pFXYym4Wbkc&t=2153s

// This function takes in the array to be sorted, and returns 
// an array of animations that will play out during the course of the algorithm.
export function createMergeSortAnimations(inputArray) {
    // Initialize the array to store animations.
    const animations = [];

    // Copy the input array to use as an auxiliary array.
    const auxiliaryArray = inputArray.slice();

    // Handle single array
    if (inputArray.length <= 1) return inputArray;

    // Call mergeSort, which will in turn call the merge function, and once completed,
    // populate the animations array with the animations needed to be carried out.
    mergeSort(inputArray, 0, inputArray.length - 1, auxiliaryArray, animations);

    return animations;
}

// This function takes in the indices of a subarray, as well as its midpoint, in order to recurse.
// It also takes in the main input array, and an auxiliary array (a copy of the main array), so as not to lose track of 
// the sequence of elements as the algorithm overwrites it(?).
// Lastly, it takes in a reference to an array of animations, which it will push pairs of indices (in the main array) to be animated.
function mergeSort(mainArray, startIndex, endIndex, auxArray, animations) {
    // Base case: the given array is one element long, therefore already sorted.
    if (startIndex === endIndex) return;

    // Create midpoint from given indices.
    const midIndex = Math.floor((startIndex + endIndex) / 2);

    // Call merge recursively on left half, then right half.
    mergeSort(auxArray, startIndex, midIndex, mainArray, animations);
    mergeSort(auxArray, midIndex + 1, endIndex, mainArray, animations);

    // Once there are two arrays to compare, call merge.
    merge(mainArray, auxArray, animations, startIndex, midIndex, endIndex);
}

// This function takes care of the comparison between individual elements in a subarray, as well as pushing 
// the appropriate pairs of indices to the animations array.
function merge(mainArray, auxArray, animations, startIndex, midPoint, endIndex) {
    // Define variables for tracking indices in the two subarrays (i, j) as well as the 
    // current index in the main array that the lower of the two will be written (k);
    let k = startIndex;
    let i = startIndex;
    let j = midPoint + 1;
    

    // This loop will run until one of the two subarrays is exhausted of 
    // elements to compare, hence the condition.
    while (i <= midPoint && j <= endIndex) {

        // We push the two indices being compared (as an array) onto the
        // animations array. We do this twice, once to change the color while the comparison
        // is happening, and once more to revert the color once the change is made.
        animations.push([i, j]);
        animations.push([i, j]);

        if (auxArray[i] <= auxArray[j]) {
            // If the element in the left array is less than the element in
            // the right array, add another tuple to the indices k (in the original array)
            animations.push([k, auxArray[i]])
            // The line below is shorthand for:
            // mainArray[k] = auxArray[i];
            // i++;
            // k++;
            mainArray[k++] = auxArray[i++];
        } else {
            // Otherwise, push the element from the right array.
            animations.push([k, auxArray[j]])
            mainArray[k++] = auxArray[j++];
        }
    }

    // When we exit this loop, one of the two lists will still have elements
    // remaining that need comparison. Only one of the following loops will execute,
    // accounting for the remaining elements in the lengthier array.
    while (i <= midPoint) {
        // Twice, for the same purpose as outlined above.
        animations.push([i, i]);
        animations.push([i, i]);
        // Then update the animations with k and j, and update the 
        // value in the main array.
        animations.push([k, auxArray[i]]);
        mainArray[k++] = auxArray[i++];
    }

    // This carries out the same function as the loop above,
    // only on the right subarray.
    while (j <= endIndex) {
        animations.push([j, j]);
        animations.push([j, j]);
        // Again, update the animations and main array.
        animations.push([k, auxArray[j]]);
        mainArray[k++] = auxArray[j++];
    }
}


// GREAT OVERVIEW OF MERGESORT, COURTESY OF MYCODESCHOOL:
// https://www.youtube.com/watch?v=TzeBrDU-JaY

// Creating an outer function that recursively calls
// the merge helper function on subarrays.
// export function mergeSort(inputArray) {
//     // Base case: if the input array is 1 element long,
//     // it is technically already sorted, therefore, return it.
//     if (inputArray.length < 2) return inputArray;

//     // Calculate the middle of the input array and generate
//     // two new arrays by splitting the array.
//     let midpoint = Math.floor(inputArray.length / 2);
//     let leftHalf = inputArray.slice(0, midpoint);
//     let rightHalf = inputArray.slice(midpoint);

//     // console.log('inputArray: ', inputArray);
//     // console.log('leftHalf: ', leftHalf, 'rightHalf: ', rightHalf);

//     // Recursively split each of these two subarrays.
//     mergeSort(leftHalf);
//     mergeSort(rightHalf);

//     // Do the merging portion, from the bottom up.
//     return merge(leftHalf, rightHalf, inputArray);
// }

// // This function takes care of the comparison logic 
// // when merging the individual elements of two subarrays.
// function merge(leftArray, rightArray, outputArray) {
//     // Instantiate an array to return, with values sorted.

//     // Use variables to track the current indices of all three arrays.
//     let leftIndex, rightIndex, mergeIndex;
//     leftIndex = rightIndex = mergeIndex = 0;

//     // console.log('output array: ', outputArray)
//     // console.log('leftArray: ', leftArray, 'rightArray: ', rightArray);

//     // Account for edge-cases ? 

//     // Iterate until we reach the end of one of the lists,
//     // at which point there are no longer any comparisons to make.
    
//     while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
//         if (leftArray[leftIndex] <= rightArray[rightIndex]) {
//             outputArray[mergeIndex] = leftArray[leftIndex];
//             leftIndex++;
//         } else { // Otherwise, the element in the right array is smaller, reverse the operation above.
//             outputArray[mergeIndex] = rightArray[rightIndex];
//             rightIndex++;
//         }
//         // Increment the index in the outputArray,
//         // so that we can store the next smallest element at that index.
//         mergeIndex++;
//     }
//     // At this point, we have either reached the end of the leftArray or the rightArray,
//     // which causes us to exit the while loop.


//     // Only one of these loops will execute, depending on which
//     // array still has elements remaining, populating the rest of 
//     // the output array with the remaining sorted elements.
//     while (leftIndex < leftArray.length) {
//         outputArray[mergeIndex] = leftArray[leftIndex];
//         leftIndex++;
//         mergeIndex++;
//     }
//     while (rightIndex < rightArray.length) {
//         outputArray[mergeIndex] = rightArray[rightIndex];
//         rightIndex++;
//         mergeIndex++;
//     }
//     // console.log(outputArray);

//     // Return the merged list. 
//     return outputArray;
// }



// TESTING 

// console.log(merge([1,2,3], [3,4,5], []));

// console.log(mergeSort([5, 2, 4, 3, 1, 6]));

// mergeSort([5, 2, 4, 1, 1, 6]);