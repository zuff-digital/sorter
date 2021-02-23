// THE QUICKSORT COMMENTED AT THE END OF THE FILE WORKS JUST FOR SORTING, 
// THE QUICKSORT THAT IS UNCOMMENTED HERE IS USED FOR VISUALIZING THE ALGORITHM.

export function createQuickSortAnimations(array) {
    // Exit if the array is only one element long or invalid.
    if (array.length <= 1) return;

    const animations = [];

    // The initial call to quicksort.
    quicksort(array, 0, array.length - 1, animations)

    return animations
}

// This function will make recursive calls to itself, populating 
// the animations array at each step using the logic of the partition function.
function quicksort(array, startIndex, endIndex, animations) {
    if (startIndex < endIndex) {
        const partitionIndex = partition(array, startIndex, endIndex, animations);
        quicksort(array, startIndex, partitionIndex - 1, animations);
        quicksort(array, partitionIndex + 1, endIndex, animations);
    }
    return;
}

// This function will carry out the core logic of partitioning and sorting
// the array and subsequent subarrays. At each step it will push pairs of indices needing
// to be swapped, which will be carried out sequentially.
function partition(array, startIndex, endIndex, animations) {
    const pivot = array[endIndex];
    let partitionIndex = startIndex;

    for (let i = startIndex; i < endIndex; i++) {
        if (array[i] <= pivot) {
            // Push two copies of the indices that need swapping
            // to convert and then revert the colors.
            animations.push([partitionIndex, i]);
            animations.push([partitionIndex, i]);
            partitionIndex++;
        }
    }
    // Once the loop ends, all that's left is to swap
    // the pivot value with the value at the partition index.
    animations.push([partitionIndex, endIndex]);
    animations.push([partitionIndex, endIndex]);

    // animations.push(`partition index is ${partitionIndex}`);

    return partitionIndex;
}

// GREAT OVERVIEW OF QUICKSORT, COURTESY OF MYCODESCHOOL:
// https://www.youtube.com/watch?v=COk73cpQbFQ

// The quicksort function takes in the start and end indices of an array and
// the array itself, and then recursively calls itself on smaller and smaller subarrays.
// It calls on the logic in the partition function in order 
// sort those subarrays.

// Note: unlike in mergesort, there is no creation of an auxiliary array.
// All of the partition logic operates on the input array itself.
// function quicksort(array, startIndex, endIndex) {
//     // Base case: the start and end index are the same (subarray of length 1)
//     // or the start and end index create an invalid subarray (0, -1, for instance).

//     // This condition covers the recursive case.
//     if (startIndex < endIndex) {
//         // Call the partition function, which will return the new partition index.
//         const partitionIndex = partition(array, startIndex, endIndex);
//         // Make recursive calls to quicksort on the left and right subarrays.
//         quicksort(array, startIndex, partitionIndex - 1);
//         quicksort(array, partitionIndex + 1, endIndex);
//     }
//     // This return statement covers the base case.
//     return;
// }

// // The partition function takes in the start and end indices of an array,
// // as well as a pivot element in that array around which it will organize its
// // sorting logic. After carrying out the sorting logic, it returns an updated
// // partition index.
// function partition(array, startIndex, endIndex) {
//     // Make the last element the pivot.
//     const pivot = array[endIndex];

//     // Make the first element the partition index;
//     let partitionIndex = startIndex;

//     // Iterate over the array. If the value at index i is greater than
//     // the pivot, swap that value with the value at partitionIndex, and increment
//     // the partitionIndex by one.
//     for (let i = startIndex; i < endIndex; i++) {
//         if (array[i] <= pivot) {
//             // Swapping the values of the partition index and the current index
//             // in the event that the current index has a lower value than the pivot.
//             let temp = array[partitionIndex];
//             array[partitionIndex] = array[i];
//             array[i] = temp;
//             partitionIndex++;
//         }
//     }

//     // Finally, swap the pivot value with the value at the partition index.
//     array[endIndex] = array[partitionIndex];
//     array[partitionIndex] = pivot;

//     // Return the partition index.
//     return partitionIndex;
// }

// TESTING

// let array1 = [7,2,1,4]
// let array2 = [1,2,3,4,1,5,4,4,1,2,3,13,11,10]

// // quicksort(array2, 0, array2.length - 1);

// let res = createQuickSortAnimations(array2);

// console.log(res);