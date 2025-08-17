// Import sorting algorithms as modules
import { bubbleSort } from './algorithms/bubbleSort.js';
import { selectionSort } from './algorithms/selectionSort.js';
import { insertionSort } from './algorithms/insertionSort.js';
import { mergeSort } from './algorithms/mergeSort.js';
import { quickSort } from './algorithms/quickSort.js';
import { heapSort } from './algorithms/heapSort.js';
import { countingSort } from './algorithms/countingSort.js';

// Complexity info and code for each algorithm
const ALGO_INFO = {
    bubbleSort: {
        name: 'Bubble Sort',
        time: 'Best: O(n), Average: O(n²), Worst: O(n²)',
        space: 'O(1)',
        code: `export function bubbleSort(arr, visualizeStep) {\n    let n = arr.length;\n    let steps = [];\n    for (let i = 0; i < n - 1; i++) {\n        for (let j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n                if (visualizeStep) steps.push([...arr]);\n            }\n        }\n    }\n    return steps;\n}`
    },
    selectionSort: {
        name: 'Selection Sort',
        time: 'Best: O(n²), Average: O(n²), Worst: O(n²)',
        space: 'O(1)',
        code: `export function selectionSort(arr, visualizeStep) {\n    let n = arr.length;\n    let steps = [];\n    for (let i = 0; i < n - 1; i++) {\n        let minIdx = i;\n        for (let j = i + 1; j < n; j++) {\n            if (arr[j] < arr[minIdx]) minIdx = j;\n        }\n        if (minIdx !== i) {\n            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];\n            if (visualizeStep) steps.push([...arr]);\n        }\n    }\n    return steps;\n}`
    },
    insertionSort: {
        name: 'Insertion Sort',
        time: 'Best: O(n), Average: O(n²), Worst: O(n²)',
        space: 'O(1)',
        code: `export function insertionSort(arr, visualizeStep) {\n    let n = arr.length;\n    let steps = [];\n    for (let i = 1; i < n; i++) {\n        let key = arr[i];\n        let j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j--;\n            if (visualizeStep) steps.push([...arr]);\n        }\n        arr[j + 1] = key;\n        if (visualizeStep) steps.push([...arr]);\n    }\n    return steps;\n}`
    },
    mergeSort: {
        name: 'Merge Sort',
        time: 'Best: O(n log n), Average: O(n log n), Worst: O(n log n)',
        space: 'O(n)',
        code: `export function mergeSort(arr, visualizeStep) {\n    let steps = [];\n    function merge(arr, l, m, r) {\n        let n1 = m - l + 1;\n        let n2 = r - m;\n        let L = arr.slice(l, m + 1);\n        let R = arr.slice(m + 1, r + 1);\n        let i = 0, j = 0, k = l;\n        while (i < n1 && j < n2) {\n            if (L[i] <= R[j]) arr[k++] = L[i++];\n            else arr[k++] = R[j++];\n            if (visualizeStep) steps.push([...arr]);\n        }\n        while (i < n1) arr[k++] = L[i++], visualizeStep && steps.push([...arr]);\n        while (j < n2) arr[k++] = R[j++], visualizeStep && steps.push([...arr]);\n    }\n    function sort(arr, l, r) {\n        if (l < r) {\n            let m = Math.floor((l + r) / 2);\n            sort(arr, l, m);\n            sort(arr, m + 1, r);\n            merge(arr, l, m, r);\n        }\n    }\n    sort(arr, 0, arr.length - 1);\n    return steps;\n}`
    },
    quickSort: {
        name: 'Quick Sort',
        time: 'Best: O(n log n), Average: O(n log n), Worst: O(n²)',
        space: 'O(log n)',
        code: `export function quickSort(arr, visualizeStep) {\n    let steps = [];\n    function partition(arr, low, high) {\n        let pivot = arr[high];\n        let i = low - 1;\n        for (let j = low; j < high; j++) {\n            if (arr[j] < pivot) {\n                i++;\n                [arr[i], arr[j]] = [arr[j], arr[i]];\n                if (visualizeStep) steps.push([...arr]);\n            }\n        }\n        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];\n        if (visualizeStep) steps.push([...arr]);\n        return i + 1;\n    }\n    function sort(arr, low, high) {\n        if (low < high) {\n            let pi = partition(arr, low, high);\n            sort(arr, low, pi - 1);\n            sort(arr, pi + 1, high);\n        }\n    }\n    sort(arr, 0, arr.length - 1);\n    return steps;\n}`
    },
    heapSort: {
        name: 'Heap Sort',
        time: 'Best: O(n log n), Average: O(n log n), Worst: O(n log n)',
        space: 'O(1)',
        code: `export function heapSort(arr, visualizeStep) {\n    let steps = [];\n    let n = arr.length;\n    function heapify(arr, n, i) {\n        let largest = i;\n        let l = 2 * i + 1;\n        let r = 2 * i + 2;\n        if (l < n && arr[l] > arr[largest]) largest = l;\n        if (r < n && arr[r] > arr[largest]) largest = r;\n        if (largest !== i) {\n            [arr[i], arr[largest]] = [arr[largest], arr[i]];\n            if (visualizeStep) steps.push([...arr]);\n            heapify(arr, n, largest);\n        }\n    }\n    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);\n    for (let i = n - 1; i > 0; i--) {\n        [arr[0], arr[i]] = [arr[i], arr[0]];\n        if (visualizeStep) steps.push([...arr]);\n        heapify(arr, i, 0);\n    }\n    return steps;\n}`
    },
    countingSort: {
        name: 'Counting Sort',
        time: 'Best: O(n + k), Average: O(n + k), Worst: O(n + k)',
        space: 'O(k)',
        code: `export function countingSort(arr, visualizeStep) {\n    let steps = [];\n    let n = arr.length;\n    let max = Math.max(...arr);\n    let min = Math.min(...arr);\n    let range = max - min + 1;\n    let count = new Array(range).fill(0);\n    let output = new Array(n).fill(0);\n    for (let i = 0; i < n; i++) count[arr[i] - min]++;\n    for (let i = 1; i < count.length; i++) count[i] += count[i - 1];\n    for (let i = n - 1; i >= 0; i--) {\n        output[count[arr[i] - min] - 1] = arr[i];\n        count[arr[i] - min]--;\n        if (visualizeStep) steps.push([...output]);\n    }\n    for (let i = 0; i < n; i++) arr[i] = output[i];\n    if (visualizeStep) steps.push([...arr]);\n    return steps;\n}`
    }
};

const arrayContainer = document.getElementById('array-container');
const arraySizeInput = document.getElementById('array-size');
const arraySizeValue = document.getElementById('array-size-value');
const speedInput = document.getElementById('speed');
speedInput.value = 100;
const speedValue = document.getElementById('speed-value');
const algorithmSelect = document.getElementById('algorithm');
const complexityInfo = document.getElementById('complexity-info');
const codeDisplay = document.getElementById('code-display');
const benchmarkBtn = document.getElementById('benchmark');
const benchmarkChartCanvas = document.getElementById('benchmark-chart');
const customArrayInput = document.getElementById('custom-array-input');
const setCustomArrayBtn = document.getElementById('set-custom-array');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const stepExplanation = document.getElementById('step-explanation');
const sortArrayBtn = document.getElementById('sort-array-btn');
const sortedArrayList = document.getElementById('sorted-array-list');

let array = [];

function generateArray(size) {
    array = Array.from({ length: size }, () => Math.floor(Math.random() * 300) + 10);
    renderArray(array);
}

function renderArray(arr, highlight = [], sorted = [], special = []) {
    arrayContainer.innerHTML = '';
    const maxVal = Math.max(...arr);
    // Prepare sorted values and mapping from value to original indices
    const sortedArr = [...arr].map((v, i) => ({ value: v, origIdx: i }));
    sortedArr.sort((a, b) => a.value - b.value);
    // Render bars in sorted order
    sortedArr.forEach((item, idx) => {
        let color = 'bg-blue-400';
        if (sorted.includes(item.origIdx)) color = 'bg-green-400';
        else if (special.includes(item.origIdx)) color = 'bg-yellow-400';
        else if (highlight.includes(item.origIdx)) color = 'bg-red-400';
        const barWrapper = document.createElement('div');
        barWrapper.style.display = 'flex';
        barWrapper.style.flexDirection = 'column';
        barWrapper.style.alignItems = 'center';
        barWrapper.style.width = `${100 / arr.length}%`;
        // Bar
        const bar = document.createElement('div');
        bar.style.height = `${(item.value / maxVal) * 100}%`;
        bar.style.width = '100%';
        bar.className = `${color} mx-0.5 rounded`;
        // X-axis label (sorted value)
        const label = document.createElement('span');
        label.textContent = item.value;
        label.style.fontSize = '0.8em';
        label.style.marginTop = '0.25em';
        label.style.color = 'inherit';
        barWrapper.appendChild(bar);
        barWrapper.appendChild(label);
        arrayContainer.appendChild(barWrapper);
    });
    // Add a separate x-axis row below the chart
    let xAxisRow = document.getElementById('x-axis-row');
    if (!xAxisRow) {
        xAxisRow = document.createElement('div');
        xAxisRow.id = 'x-axis-row';
        xAxisRow.style.display = 'flex';
        xAxisRow.style.justifyContent = 'center';
        xAxisRow.style.marginTop = '0.5em';
        arrayContainer.parentNode.insertBefore(xAxisRow, arrayContainer.nextSibling);
    }
    xAxisRow.innerHTML = '';
    sortedArr.forEach(item => {
        const tick = document.createElement('span');
        tick.textContent = item.value;
        tick.style.display = 'inline-block';
        tick.style.width = `${100 / arr.length}%`;
        tick.style.textAlign = 'center';
        tick.style.fontSize = '0.8em';
        tick.style.color = 'var(--tw-prose-body, #64748b)';
        xAxisRow.appendChild(tick);
    });
}

function getAlgorithmFunc(name) {
    switch (name) {
        case 'bubbleSort': return bubbleSort;
        case 'selectionSort': return selectionSort;
        case 'insertionSort': return insertionSort;
        case 'mergeSort': return mergeSort;
        case 'quickSort': return quickSort;
        case 'heapSort': return heapSort;
        case 'countingSort': return countingSort;
        default: return bubbleSort;
    }
}

function updateComplexityAndCode() {
    const algo = algorithmSelect.value;
    const info = ALGO_INFO[algo];
    complexityInfo.innerHTML = `<b>Time Complexity:</b> ${info.time}<br><b>Space Complexity:</b> ${info.space}`;
    codeDisplay.textContent = info.code;
}

algorithmSelect.addEventListener('change', () => {
    updateComplexityAndCode();
});

async function animateSorting(steps, speed) {
    for (let i = 0; i < steps.length; i++) {
        renderArray(steps[i]);
        await new Promise(res => setTimeout(res, speed));
    }
}

sortArrayBtn.addEventListener('click', () => {
    if (!array || array.length === 0) return;
    const algoName = algorithmSelect.value;
    const algoFunc = getAlgorithmFunc(algoName);
    const arrCopy = array.slice();
    const stepsForSort = algoFunc(arrCopy, true);
    let i = 0;
    function animateStep() {
        if (i < stepsForSort.length) {
            renderArray(stepsForSort[i]);
            i++;
            setTimeout(animateStep, Number(speedInput.value));
        } else {
            renderArray(arrCopy, [], Array.from({length: arrCopy.length}, (_, idx) => idx));
            sortedArrayList.textContent = 'Sorted Array: [' + arrCopy.join(', ') + ']';
        }
    }
    animateStep();
});

setCustomArrayBtn.addEventListener('click', () => {
    const input = customArrayInput.value.trim();
    if (!input) return;
    let arr = input.split(/,|\s+/).map(Number).filter(n => !isNaN(n));
    if (arr.length === 0) {
        alert('Please enter a valid array of numbers, e.g. 5,3,8,1');
        return;
    }
    array = arr;
    arraySizeInput.value = arr.length;
    arraySizeValue.textContent = arr.length;
    renderArray(array);
    sortedArrayList.textContent = '';
});

// Algorithm-specific highlight logic
function getSpecialHighlight(algo, arr, stepIdx) {
    // Returns { indices: [], label: '' }
    switch (algo) {
        case 'quickSort': {
            // Try to find pivot: last element changed from previous step
            if (stepIdx > 0) {
                const prev = steps[stepIdx - 1];
                const curr = steps[stepIdx];
                for (let i = 0; i < curr.length; i++) {
                    if (curr[i] !== prev[i]) {
                        // Pivot is often at the end of partition
                        return { indices: [i], label: `Pivot at index ${i}` };
                    }
                }
            }
            break;
        }
        case 'selectionSort': {
            // Highlight min index: find the smallest value in unsorted part
            let minIdx = 0;
            for (let i = 1; i < arr.length; i++) if (arr[i] < arr[minIdx]) minIdx = i;
            return { indices: [minIdx], label: `Current min at index ${minIdx}` };
        }
        case 'insertionSort': {
            // Highlight key: first out-of-order element
            for (let i = 1; i < arr.length; i++) if (arr[i] < arr[i - 1]) return { indices: [i], label: `Key at index ${i}` };
            break;
        }
        default: return { indices: [], label: '' };
    }
    return { indices: [], label: '' };
}

// Initial setup
arraySizeValue.textContent = arraySizeInput.value;
speedValue.textContent = speedInput.value + 'ms';
generateArray(Number(arraySizeInput.value));
updateComplexityAndCode();

// Load Chart.js from CDN
if (!window.Chart) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = () => {};
    document.body.appendChild(script);
}

// Dark mode toggle logic
function setDarkMode(on) {
    document.body.classList.toggle('dark', on);
    darkModeToggle.textContent = on ? 'Light Mode' : 'Dark Mode';
    localStorage.setItem('darkMode', on ? '1' : '0');
}
darkModeToggle.addEventListener('click', () => {
    setDarkMode(!document.body.classList.contains('dark'));
});
// On load, restore dark mode
if (localStorage.getItem('darkMode') === '1') setDarkMode(true);
