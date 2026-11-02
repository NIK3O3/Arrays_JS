"use strict";

function visitRange(start, end, action) {
  if (start >= end) return true;
  if (end - start === 1) return action(start) !== false;

  const middle = start + Math.floor((end - start) / 2);

  return visitRange(start, middle, action) && visitRange(middle, end, action);
}

// 1. Максимальна кількість одиниць поспіль
function findMaxConsecutiveOnes(nums) {
  let current = 0;
  let maximum = 0;

  visitRange(0, nums.length, (index) => {
    if (nums[index] === 1) {
      current += 1;
      if (current > maximum) maximum = current;
    } else {
      current = 0;
    }
  });

  return maximum;
}

// 2. Кількість чисел із парною кількістю цифр
function findNumbers(nums) {
  function countDigits(value) {
    if (value < 10) return 1;
    return 1 + countDigits(Math.floor(value / 10));
  }

  let count = 0;

  visitRange(0, nums.length, (index) => {
    if (countDigits(nums[index]) % 2 === 0) count += 1;
  });

  return count;
}

// 3. Квадрати відсортованого масиву. Початковий масив не змінюється
function sortedSquares(nums) {
  const result = new Array(nums.length);
  let left = 0;
  let right = nums.length - 1;

  visitRange(0, nums.length, (step) => {
    const leftSquare = nums[left] * nums[left];
    const rightSquare = nums[right] * nums[right];
    const write = nums.length - 1 - step;

    if (leftSquare > rightSquare) {
      result[write] = leftSquare;
      left += 1;
    } else {
      result[write] = rightSquare;
      right -= 1;
    }
  });

  return result;
}

// 4. Продублювати нулі на місці, зберігши довжину масиву
function duplicateZeros(arr) {
  let zeroCount = 0;

  visitRange(0, arr.length, (index) => {
    if (arr[index] === 0) zeroCount += 1;
  });

  let write = arr.length + zeroCount - 1;

  visitRange(0, arr.length, (step) => {
    const read = arr.length - 1 - step;
    const value = arr[read];

    if (write < arr.length) arr[write] = value;
    write -= 1;

    if (value === 0) {
      if (write < arr.length) arr[write] = 0;
      write -= 1;
    }
  });
}

// 5. Об'єднати масиви у nums1. Функція нічого не повертає
function merge(nums1, m, nums2, n) {
  let first = m - 1;
  let second = n - 1;

  visitRange(0, m + n, (step) => {
    if (second < 0) return false;

    const write = m + n - 1 - step;

    if (first >= 0 && nums1[first] > nums2[second]) {
      nums1[write] = nums1[first];
      first -= 1;
    } else {
      nums1[write] = nums2[second];
      second -= 1;
    }
  });
}

// 6. Видалити дублікати на місці та повернути кількість унікальних значень
function removeDuplicates(nums) {
  let write = 0;

  visitRange(0, nums.length, (read) => {
    if (write === 0 || nums[read] !== nums[write - 1]) {
      nums[write] = nums[read];
      write += 1;
    }
  });

  return write;
}

// 7. Перевірити наявність числа та його подвійника на різних позиціях
function checkIfExist(arr) {
  const seen = {};
  let exists = false;

  visitRange(0, arr.length, (index) => {
    const value = arr[index];

    if (
      seen[value * 2] === true ||
      (value % 2 === 0 && seen[value / 2] === true)
    ) {
      exists = true;
      return false;
    }

    seen[value] = true;
  });

  return exists;
}

// 8. Строге зростання до внутрішньої вершини, потім строге спадання
function validMountainArray(arr) {
  if (arr.length < 3) return false;

  let descending = false;

  const valid = visitRange(1, arr.length, (index) => {
    const previous = arr[index - 1];
    const current = arr[index];

    if (current === previous) return false;

    if (current < previous) {
      if (index === 1) return false;
      descending = true;
    } else if (descending) {
      return false;
    }
  });

  return valid && descending;
}

// 9. Замінити кожен елемент найбільшим значенням праворуч від нього
function replaceElements(arr) {
  let maximum = -1;

  visitRange(0, arr.length, (step) => {
    const index = arr.length - 1 - step;
    const value = arr[index];

    arr[index] = maximum;
    if (value > maximum) maximum = value;
  });

  return arr;
}

// 10. Перемістити парні числа на початок масиву
function sortArrayByParity(nums) {
  let evenEnd = 0;

  visitRange(0, nums.length, (index) => {
    if (nums[index] % 2 === 0) {
      const temporary = nums[evenEnd];
      nums[evenEnd] = nums[index];
      nums[index] = temporary;
      evenEnd += 1;
    }
  });

  return nums;
}

console.log("1:", findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1]));
console.log("1:", findMaxConsecutiveOnes([1, 0, 1, 1, 0, 1]));

console.log("2:", findNumbers([12, 345, 2, 6, 7896]));
console.log("2:", findNumbers([555, 901, 482, 1771]));
console.log("3:", sortedSquares([-4, -1, 0, 3, 10]));
console.log("3:", sortedSquares([-7, -3, 2, 3, 11]));

const zeros1 = [1, 0, 2, 3, 0, 4, 5, 0];
duplicateZeros(zeros1);
console.log("4:", zeros1);
const zeros2 = [1, 2, 3];
duplicateZeros(zeros2);
console.log("4:", zeros2);

const merged1 = [1, 2, 3, 0, 0, 0];
merge(merged1, 3, [2, 5, 6], 3);
console.log("5:", merged1);
const merged2 = [1];
merge(merged2, 1, [], 0);
console.log("5:", merged2);
const merged3 = [0];
merge(merged3, 0, [1], 1);
console.log("5:", merged3);

const unique1 = [1, 1, 2];
const k1 = removeDuplicates(unique1);
console.log("6:", k1, unique1);
const unique2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
const k2 = removeDuplicates(unique2);
console.log("6:", k2, unique2);

console.log("7:", checkIfExist([10, 2, 5, 3]));
console.log("7:", checkIfExist([3, 1, 7, 11]));

console.log("8:", validMountainArray([2, 1]));
console.log("8:", validMountainArray([3, 5, 5]));
console.log("8:", validMountainArray([0, 3, 2, 1]));

console.log("9:", replaceElements([17, 18, 5, 4, 6, 1]));
console.log("9:", replaceElements([400]));

console.log("10:", sortArrayByParity([3, 1, 2, 4]));
console.log("10:", sortArrayByParity([0]));
